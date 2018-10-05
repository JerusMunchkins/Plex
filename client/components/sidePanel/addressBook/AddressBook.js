import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import Autocomplete from './Autocomplete'
import {HomesList, PlacesList} from './List'
import '../../../../secrets'

const styles = theme => ({
  round: {
    height: '35px',
    maxWidth: '35px',
    left: '62px',
    bottom: '6px',
    opacity: '0.2',
    borderRadius: '100px',
    backgroundColor: 'white',
    margin: '0 62px'
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
    const {classes, homes, places} = this.props
    const type = value === 0 ? 'Home' : 'Place'
    return (
      <div>
        <div className="addressbook-select">
          <AppBar position="static" style={{backgroundColor: '#5665bb'}}>
            <Tabs
              value={value}
              classes={{indicator: classes.round}}
              onChange={this.handleChange}
            >
              <Tab disableRipple icon={<HomeIcon />} />
              <Tab disableRipple icon={<StarIcon />} />
            </Tabs>
          </AppBar>
        </div>

        <div className="addressbook-display side-panel-body">
          <Autocomplete
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
              process.env.GOOGLE_API_KEY
            }&libraries=places`}
            loadingElement={<div style={{height: `100%`}} />}
            type={type}
          />
          {value === 0 &&
            homes && (
              <HomesList>
                <p>Add addresses</p>
              </HomesList>
            )}
          {value === 1 &&
            places && (
              <PlacesList>
                <div>
                  <p>Bookmark important locations</p>
                  <small>e.g. work, Mom's house, pet hospital</small>
                </div>
              </PlacesList>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  homes: state.homes,
  places: state.places
})

export default connect(mapStateToProps)(withStyles(styles)(AddressBook))
