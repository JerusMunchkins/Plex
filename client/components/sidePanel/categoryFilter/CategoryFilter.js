//-------------WORK IN PROGRESS--------------------

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFilterCategories} from '../../../store/'
// Material UI
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class CategoryFilter extends Component {
  componentDidMount() {
    this.props.fetchFilterCategories()
  }

  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state
    const categories = this.props.filterItems

    if (this.props.filterErrored) {
      return <p>Sorry! There was an error loading the filter categories</p>
    }

    if (this.props.filterFetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Select Filters
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {categories &&
            categories.map(category => (
              <MenuItem key={category.id} onClick={this.handleClose}>
                {category.type.replace(/_/g, ' ')}
              </MenuItem>
            ))}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filterErrored: state.categories.filterErrored,
    filterFetching: state.categories.filterFetching,
    filterItems: state.categories.filterItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilterCategories: () => dispatch(fetchFilterCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
