import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ForwardIcon from '@material-ui/icons/Forward'
import SelectedCategories from './SelectedCategories'
import Menu from './Menu'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    width: '44%'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const Categories = props => {
  const {classes} = props
  return (
    <div className="categories-display side-panel-body">
      <div className="content-wrap flex-container menu-buttons">
        <Menu />
        <Button variant="outlined" color="primary" className={classes.button}>
          Compare My Homes
          <ForwardIcon className={classes.rightIcon} />
        </Button>
      </div>
      <SelectedCategories />
    </div>
  )
}

export default withStyles(styles)(Categories)
