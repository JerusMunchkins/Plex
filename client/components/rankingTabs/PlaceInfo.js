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
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    width: '100%',
    margin: '25px 0 0 14px'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  },
  heading: {
    display: 'inline',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: 4
  },
  caption: {
    display: 'inline',
    marginLeft: '20px',
    lineHeight: 5.2
  },
  progress: {
    position: 'absolute',
    left: '60vw',
    top: '90vh'
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
  // console.log(homeCategories)
  // console.log(homeId)
  // console.log(priorities)
  // console.log(homePlaces)

  if (!homeCategories[homeId]) return null
  if (!homePlaces) return null

  return homeCategories.loaded &&
    categoryResults.loaded &&
    homePlaces.loaded ? (
    <div className={classes.root}>
      {priorities.map(item => {
        if (!homeCategories[homeId][item.categoryId] && !item.placeId) {
          return
        }
        if (!homePlaces[homeId]) return
        const name = item.placeId
          ? item.label
          : `${homeCategories[homeId][item.categoryId].name}`
        const type = item.placeId
          ? 'My place'
          : item.label
              .split('_')
              .map(word => word[0].toUpperCase() + word.slice(1))
              .join(' ')

        console.log('homePlaces', homePlaces)
        console.log('homeId', homeId)
        console.log('homePlaces[homeId]', homePlaces[homeId])

        const info = item.placeId
          ? homePlaces[homeId][item.placeId]
          : homeCategories[homeId][item.categoryId]

        if (!info) {
          return
        }
        return (
          <ExpansionPanel key={item.priority}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex-container">
                <div>
                  <Typography className={classes.heading}>
                    {name} - {info.distanceText}
                  </Typography>
                  <Typography className={classes.caption} variant="caption">
                    {type}
                  </Typography>
                </div>
                <div className="flex-container duration-group">
                  <div
                    className="flex-container fields duration-wrapper"
                    style={{marginLeft: '18px'}}
                  >
                    <DirectionsCar className={classes.icon} />
                    <Typography>{info.drivingText}</Typography>
                  </div>
                  <div className="flex-container fields duration-wrapper">
                    <DirectionsTransit className={classes.icon} />
                    <Typography>{info.transitText}</Typography>
                  </div>
                  <div className="flex-container fields duration-wrapper">
                    <DirectionsBike className={classes.icon} />
                    <Typography>{info.bicyclingText}</Typography>
                  </div>
                  <div className="flex-container fields duration-wrapper">
                    <DirectionsWalk className={classes.icon} />
                    <Typography>{info.walkingText}</Typography>
                  </div>
                </div>
              </div>
            </ExpansionPanelSummary>
            {/* <ExpansionPanelDetails /> */}
          </ExpansionPanel>
        )
      })}
    </div>
  ) : (
    <div className="all-center">
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
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
