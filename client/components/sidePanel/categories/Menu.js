import React from 'react'
import {connect} from 'react-redux'
import DropDown from './DropDown'
import {fetchFilterCategories, addNewSelectedFilter} from '../../../store'

class Menu extends React.Component {
  componentDidMount() {
    this.props.fetchFilterCategories()
  }

  state = {
    anchorEl: null
  }

  handleMenuClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuClose = (event, category) => {
    this.setState({anchorEl: null})
    if (category !== 'backdropClick') {
      const {type, id, priority} = category
      const payload = {
        label: type,
        categoryId: id,
        priority
      }
      this.props.addFilter(payload)
    }
  }

  render() {
    const {
      filterCategories,
      selectedCategories,
      filterCategoriesErrored,
      filterCategoriesFetching
    } = this.props
    const {anchorEl} = this.state

    if (filterCategoriesErrored) {
      return <p>Sorry! There was an error loading the filter categories</p>
    }

    if (filterCategoriesFetching) {
      return <p>Loading...</p>
    }

    return (
      <DropDown
        anchorEl={anchorEl}
        handleMenuClick={this.handleMenuClick}
        handleMenuClose={this.handleMenuClose}
        categories={filterCategories}
        selectedCategories={selectedCategories}
      />
    )
  }
}

const mapStateToProps = state => {
  const {
    filterCategoriesErrored,
    filterCategoriesFetching,
    filterCategories
  } = state.categoryFilter

  return {
    filterCategoriesErrored,
    filterCategoriesFetching,
    filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilterCategories: () => dispatch(fetchFilterCategories()),
    addFilter: payload => dispatch(addNewSelectedFilter(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
