import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DirectionsBike from '@material-ui/icons/DirectionsBike'
import DirectionsCar from '@material-ui/icons/DirectionsCar'
import DirectionsWalk from '@material-ui/icons/DirectionsWalk'
import DirectionsTransit from '@material-ui/icons/DirectionsTransit'

const styles = theme => ({
  root: {
    width: '100%'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

const PlaceInfo = props => {
  const {
    classes,
    homeId,
    homePlaces,
    homeCategories,
    priorities,
    categoryResults
  } = props
  return homeCategories.loaded && categoryResults.loaded ? (
    <div className={classes.root}>
      {priorities.map(item => {
        // console.log('item')
        if (
          !homeCategories.homeCategories[homeId][item.categoryId] &&
          !item.placeId
        ) {
          return
        }
        const name = item.placeId
          ? item.label
          : `${
              homeCategories.homeCategories[homeId][item.categoryId].name
            } (${item.label
              .split('_')
              .map(word => word[0].toUpperCase() + word.slice(1))
              .join(' ')})`
        const info = item.placeId
          ? homePlaces.homePlaces[homeId][item.placeId]
          : homeCategories.homeCategories[homeId][item.categoryId]
        return (
          <ExpansionPanel key={item.priority}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {name} - {info.distanceText}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <DirectionsCar className={classes.icon} />
                {info.drivingText}
                <DirectionsTransit className={classes.icon} />
                {info.transitText}
                <DirectionsBike className={classes.icon} />
                {info.bicyclingText}
                <DirectionsWalk className={classes.icon} />
                {info.walkingText}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  ) : (
    <div />
  )
}

const mapState = state => {
  return {
    categories: state.categoryFilter.filterCategories,
    homePlaces: state.homePlaces,
    categoryResults: state.categoryResults,
    homeCategories: state.homeCategories,
    priorities: state.selectedCategories.selectedCategories
  }
}

PlaceInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(PlaceInfo))
