import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles, AppBar, Tabs, Tab} from '@material-ui/core/'
import {HomeTab} from '../'
import {getBounds} from '../../store'
import {getHomeRankings} from '../../utilities'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

class RankingTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value, homeId) => {
    this.setState({value})
    const {markers, getBounds, homes} = this.props
    // const {lat, lng} = homes[homeId].location
    // let markersArr = []
    // for (let key in markers[homeId]) {
    //   if (markers[homeId].hasOwnProperty(key)) {
    //     for (let i = 0; i < 5; i++) {
    //       markersArr.push(markers[key][i].geometry)
    //     }
    //   }
    // }
    // const bounds = getBounds(markersArr, {lat, lng})
  }

  getRankedHomeId = () => {
    const {homeCategories, homePlaces, selectedCategories} = this.props
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
    const {classes, homes} = this.props
    const {value} = this.state
    const rankings = this.getRankedHomeId()
    console.log('Rankings', rankings)
    console.log('homes', homes)
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {rankings &&
              homes.map((home, i) => {
                const homeId = rankings[i].homeId
                return <Tab key={homeId} label={i + 1} />
              })}
          </Tabs>
        </AppBar>
        {rankings && <HomeTab homeId={Number(rankings[value].homeId)} />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    homes: state.homes,
    userId: state.user.id,
    markers: state.categoryResults,
    homeCategories: state.homeCategories.homeCategories,
    selectedCategories: state.selectedCategories.selectedCategories,
    homePlaces: state.homePlaces.homePlaces
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeLatLng) => dispatch(getBounds(markers, homeLatLng))
})

RankingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(RankingTabs))
