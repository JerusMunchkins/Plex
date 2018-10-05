import React from 'react'
import {connect} from 'react-redux'
import {
  fetchFilterCategories,
  fetchSelectedCategories,
  addNewSelectedFilter
} from '../../../store'
import FilterDropDown from './FilterDropDown'
import SelectedCategories from './SelectedCategories'

class Categories extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchSelectedCategories(this.props.userId)
    }
    this.props.fetchFilterCategories()
  }

  state = {
    anchorEl: null
  }

  // ACTION HANDLERS
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
      filterCategoriesFetching,
      selectedCategoriesErrored,
      selectedCategoriesFetching
    } = this.props
    const {anchorEl} = this.state

    // FILTER DROP-DOWN (LOADING/ERROR),
    if (filterCategoriesErrored) {
      return <p>Sorry! There was an error loading the filter categories</p>
    }

    if (filterCategoriesFetching) {
      return <p>Loading...</p>
    }

    // SELECTED CATEGORIES (LOADING/ERROR)
    if (selectedCategoriesErrored) {
      return <p>Sorry! There was an error loading your selected filters</p>
    }

    if (selectedCategoriesFetching) {
      return <p>Loading...</p>
    }

    // DISPLAY
    return (
      <div>
        <div>
          <FilterDropDown
            availableCategories={filterCategories}
            selectedCategories={selectedCategories}
            anchorEl={anchorEl}
            handleMenuClick={this.handleMenuClick}
            handleMenuClose={this.handleMenuClose}
          />
        </div>
        <div>
          <SelectedCategories selectedCategories={selectedCategories} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    filterCategoriesErrored,
    filterCategoriesFetching,
    filterCategories
  } = state.categoryFilter

  const {
    selectedCategoriesErrored,
    selectedCategoriesFetching,
    selectedCategories
  } = state.selectedCategories

  return {
    userId: state.user.id,
    selectedCategoriesErrored,
    selectedCategoriesFetching,
    selectedCategories,
    filterCategoriesErrored,
    filterCategoriesFetching,
    filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedCategories: userId =>
      dispatch(fetchSelectedCategories(userId)),
    fetchFilterCategories: () => dispatch(fetchFilterCategories()),
    addFilter: payload => dispatch(addNewSelectedFilter(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
