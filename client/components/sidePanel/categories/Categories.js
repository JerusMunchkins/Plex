import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SelectedCategories from './SelectedCategories'
import Menu from './Menu'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    width: '44%',
    backgroundColor: 'white'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const Categories = props => {
  const {classes, items} = props
  return (
    <div className="categories-display side-panel-body">
      <div className="content-wrap flex-container menu-buttons">
        <Menu />
      </div>
      <Typography
        style={{textAlign: 'center', marginTop: '12px'}}
        variant="caption"
        gutterBottom
      >
        Select and prioritize the types of locations that matter to you
      </Typography>
      <SelectedCategories items={items} />
    </div>
  )
}

export default withStyles(styles)(Categories)
