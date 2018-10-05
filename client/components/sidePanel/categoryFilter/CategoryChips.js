import React from 'react'
import {connect} from 'react-redux'
import {removeSelectedFilter} from '../../../store'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

function handleChipDelete(chipId) {
  console.log('I WILL DELETE THE CHIP for:', chipId)
  // dispatch action to remove filter
  // update - push other filters up
}

const CategoryChips = props => {
  const {classes, placeId, chipId, priority, label} = props

  return (
    <div className={classes.root}>
      {placeId ? (
        <Chip
          avatar={<Avatar>{priority}</Avatar>}
          label={label}
          className={classes.chip}
          color="primary"
          variant="outlined"
        />
      ) : (
        <Chip
          avatar={<Avatar>{priority}</Avatar>}
          label={label}
          onDelete={() => handleChipDelete(chipId)}
          className={classes.chip}
          color="primary"
          variant="outlined"
        />
      )}
    </div>
  )
}

CategoryChips.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const {selectedCategories} = state.selectedCategories
  return {
    //userId: state.user.id,
    selectedCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFilter: payload => dispatch(removeSelectedFilter(payload))
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CategoryChips)
)
