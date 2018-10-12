import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import CircularProgress from '@material-ui/core/CircularProgress'
import Autocomplete from './Autocomplete'
import {HomesList, PlacesList} from './List'
import '../../../../secrets'

const styles = theme => ({
  label: {
    textTransform: 'capitalize'
  },
  indicator: {
    height: '66px',
    maxWidth: '97px',
    left: '62px',
    bottom: '3px',
    opacity: '0.2',
    borderRadius: '187px',
    backgroundColor: '#b2b8d8',
    margin: '0 31px'
  }
})

class AddressBook extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.userId !== this.props.userId || nextState !== this.state
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {value} = this.state
    const {classes, homes, places, fetching} = this.props
    const type = value === 0 ? 'Home' : 'Place'
    return (
      <div>
        <div className="addressbook-select">
          <AppBar
            position="static"
            style={{backgroundColor: '#f1f1f1', color: 'black'}}
          >
            <Tabs
              classes={{indicator: classes.indicator}}
              centered={true}
              value={value}
              onChange={this.handleChange}
            >
              <Tab disableRipple label="Homes" icon={<HomeIcon />} />
              <Tab disableRipple label="My Places" icon={<StarIcon />} />
            </Tabs>

            <Autocomplete
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                process.env.GOOGLE_API_KEY
              }&libraries=places`}
              loadingElement={<div style={{height: `100%`}} />}
              type={type}
            />
          </AppBar>
        </div>

        <div className="addressbook-display side-panel-body">
          {value === 0 &&
            homes && (
              <HomesList>
                <Typography
                  style={{margin: '10px 5px 0 0'}}
                  variant="subheading"
                >
                  You currently have nothing in your address book
                </Typography>
              </HomesList>
            )}
          {value === 1 &&
            places && (
              <PlacesList>
                <div>
                  <Typography
                    style={{margin: '10px 5px 0 0'}}
                    variant="subheading"
                  >
                    Bookmark important locations
                  </Typography>
                  <small>e.g. work, Mom's house, pet hospital</small>
                </div>
              </PlacesList>
            )}
          {fetching && (
            <div className="flex-container menu-buttons">
              <CircularProgress
                className={classes.progress}
                color="secondary"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  homes: state.homes,
  places: state.places,
  fetching: state.homeCategories.fetchingHomeResults
})

export default connect(mapStateToProps)(withStyles(styles)(AddressBook))
