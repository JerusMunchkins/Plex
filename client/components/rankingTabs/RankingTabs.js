import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
  withStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Toolbar
} from '@material-ui/core/'
import StarIcon from '@material-ui/icons/Star'
import {HomeTab} from '../'
import {getBounds} from '../../store'
import {getHomeRankings} from '../../utilities'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  indicator: {
    height: '43px',
    maxWidth: '43px',
    left: '62px',
    bottom: '3px',
    opacity: '0.2',
    borderRadius: '100px',
    backgroundColor: 'white',
    margin: '0 58px'
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  header: {
    color: 'white',
    marginLeft: '5px',
    fontSize: '20px'
  }
})

class RankingTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value, homeId) => {
    this.setState({value})
  }

  getRankedHomeId = () => {
    const {
      homeCategories: {homeCategories},
      homePlaces: {homePlaces},
      selectedCategories
    } = this.props
    const homeCatKeys = Object.keys(homeCategories)
    const homePlacesKeys = Object.keys(homePlaces)
    const selectedCatKeys = Object.keys(selectedCategories)
    const homeCatExists = homeCatKeys.length > 0
    const selectedCatExists = selectedCatKeys.length > 0
    const homePlacesExists = homePlacesKeys.length > 0
    if (homeCatExists && selectedCatExists && homePlacesExists) {
      return getHomeRankings(homeCategories, homePlaces, selectedCategories)
    }
  }

  render() {
    const {classes, homes, homeCategories, homePlaces} = this.props
    const {value} = this.state
    const rankings = this.getRankedHomeId()
    return (
      homeCategories.loaded &&
      homePlaces.loaded && (
        <div className={classes.root}>
          <AppBar
            position="relative"
            color="default"
            style={{
              display: 'flex',
              flexFlow: 'row',
              backgroundColor: '#3f51b5'
            }}
          >
            <Toolbar>
              <StarIcon style={{color: 'yellow', fontSize: '36px'}} />
              <Typography variant="display1" className={classes.header}>
                Results
              </Typography>
            </Toolbar>
            <Tabs
              value={value}
              onChange={this.handleChange}
              style={{
                backgroundColor: '#3f51b5',
                width: '100%',
                margin: 'auto 0'
              }}
              classes={{indicator: classes.indicator}}
            >
              {rankings &&
                homes.map((home, i) => {
                  const homeId = rankings[i].homeId
                  return (
                    <Tab
                      disableRipple
                      classes={{label: classes.label}}
                      key={homeId}
                      label={i + 1}
                    />
                  )
                })}
            </Tabs>
          </AppBar>
          {rankings && <HomeTab homeId={Number(rankings[value].homeId)} />}
        </div>
      )
    )
  }
}

const mapState = state => {
  return {
    homes: state.homes,
    userId: state.user.id,
    markers: state.categoryResults,
    homeCategories: state.homeCategories,
    selectedCategories: state.selectedCategories.selectedCategories,
    homePlaces: state.homePlaces
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeLatLng) => dispatch(getBounds(markers, homeLatLng))
})

RankingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(RankingTabs))
