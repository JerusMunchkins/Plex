import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'
import {HomeTab} from '../'
import {getBounds, getRanks} from '../../store'
import {rankHomes as ranker} from '../../utilities'

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
  // replace this ranking store
  state = {
    value: 0
  }

  handleChange = (event, value, homeId) => {
    this.setState({value})
  }

  rankHomes = () => {
    const {homes, homeCategories, homePlaces, selectedCategories} = this.props
    const data = ranker(
      homes,
      homeCategories,
      homePlaces,
      selectedCategories.selectedCategories
    )
    return data
  }

  render() {
    const {
      classes,
      homes,
      homeCategories,
      homePlaces,
      selectedCategories,
      rankings
    } = this.props
    const {value} = this.state
    if (
      !rankings.called &&
      homeCategories.loaded &&
      homePlaces.loaded &&
      !selectedCategories.selectedCategoriesFetching
    ) {
      // debugger
      const data = this.rankHomes(
        homes,
        homeCategories,
        homePlaces,
        selectedCategories.selectedCategories
      )
      console.log(data)
      this.props.getRanks(data)
    }

    return (
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
            {/* {homes.map((home, i) => <Tab key={home.id} label={i + 1} />)} */}
            {rankings.data &&
              homes.map((home, i) => {
                const homeId = rankings.data[i]
                return (
                  <Tab
                    disableRipple
                    key={homeId}
                    label={i + 1}
                    style={{color: 'white', fontSize: '18px'}}
                  />
                )
              })}
          </Tabs>
        </AppBar>
        {/* <HomeTab homeId={dummyRank[value]} /> */}
        {rankings.data && <HomeTab homeId={rankings.data[value]} />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    homes: state.homes,
    userId: state.user.id,
    markers: state.categoryResults,
    homeCategories: state.homeCategories,
    selectedCategories: state.selectedCategories,
    homePlaces: state.homePlaces,
    rankings: state.rankings
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeLatLng) => dispatch(getBounds(markers, homeLatLng)),
  getRanks: rankData => dispatch(getRanks(rankData))
})

RankingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(RankingTabs))
