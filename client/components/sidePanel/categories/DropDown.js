import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'
import {postCategory} from '../../../store'
import {getUnselectedCategories} from '../../../utilities'

const DropDown = props => {
  const {
    categories,
    selectedCategories,
    anchorEl,
    handleMenuClose,
    handleMenuClick
  } = props

  const unselected = getUnselectedCategories({
    selected: selectedCategories,
    categories
  })

  return (
    <div className="menu">
      <Button
        aria-owns={anchorEl ? 'simple-menu' : null}
        aria-haspopup="true"
        aria-label="Add"
        onClick={handleMenuClick}
        variant="outlined"
        color="primary"
        style={{marginTop: '8px', backgroundColor: 'white'}}
      >
        <AddIcon style={{marginRight: '5px'}} />
        Select Nearby Places
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {categories &&
          unselected.map(category => (
            <MenuItem
              key={category.id}
              onClick={e =>
                handleMenuClose(e, {
                  ...category,
                  priority: selectedCategories.length + 1
                })
              }
            >
              {category.type.replace(/_/g, ' ')}
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}

const mapStateToProps = state => {
  const {selectedCategories} = state.selectedCategories

  return {
    selectedCategories,
    categories: state.categoryFilter.filterCategories
  }
}

const mapDispatchToProps = dispatch => ({
  postCategory: payload => dispatch(postCategory(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
