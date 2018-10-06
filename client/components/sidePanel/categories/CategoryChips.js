import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import {deleteCategory} from '../../../store'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit,
    width: '250px',
    display: 'flex',
    position: 'relative',
    backgroundColor: 'white'
  },
  left: {
    position: 'absolute',
    left: 0
  }
})

class CategoryChips extends React.Component {
  handleChipDelete = ({chipId, priority}) => {
    const {userId, deleteCategory} = this.props
    deleteCategory({userId, categoryId: chipId, priority})
  }

  render() {
    const {classes, placeId, chipId, priority, label} = this.props

    return (
      <div className={classes.root}>
        {placeId ? (
          <Chip
            avatar={<Avatar className={classes.left}>{priority}</Avatar>}
            label={label}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
        ) : (
          <Chip
            avatar={<Avatar className={classes.left}>{priority}</Avatar>}
            label={label}
            onDelete={() => this.handleChipDelete({chipId, priority})}
            className={classes.chip}
            color="primary"
            variant="outlined"
          />
        )}
      </div>
    )
  }
}

CategoryChips.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const {selectedCategories} = state.selectedCategories
  return {
    selectedCategories,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: payload => dispatch(deleteCategory(payload))
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CategoryChips)
)
