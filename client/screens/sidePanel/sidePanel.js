import React from 'react'
import {connect} from 'react-redux'
import {AddressBook, Categories} from '../../components'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {DragDropContext} from 'react-beautiful-dnd'
import {fetchSelectedCategoriesSuccess} from '../../store'
import {reorderAndShift, updateCategoriesInDb} from '../../utilities'

class ScreensSidePanel extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      items: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentDidMount() {
    const {items: selected, userId} = this.props
    if (selected && userId) {
      window.onbeforeunload = updateCategoriesInDb(event, {selected, userId})
    }
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const items = reorderAndShift(
      this.props.items,
      result.source.index,
      result.destination.index
    )

    this.props.reorderList(items)
  }

  render() {
    const {value} = this.state
    return (
      <div id="side-panel">
        <AppBar position="static">
          <Tabs centered={true} value={value} onChange={this.handleChange}>
            <Tab label="Address Book" />
            <Tab label="Filters" />
          </Tabs>
        </AppBar>

        {value === 0 && <AddressBook />}
        {value === 1 && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Categories items={this.state.items} />
          </DragDropContext>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.selectedCategories.selectedCategories,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  reorderList: payload => dispatch(fetchSelectedCategoriesSuccess(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreensSidePanel)
