import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {ScreensAbout, ScreensModalLogin, ScreensModalSignup} from './screens'
import {me, updateRanks} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route path="/about" component={ScreensAbout} />
        <Route path="/login" component={ScreensModalLogin} />
        <Route path="/signup" component={ScreensModalSignup} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    center: state.coordinates.center
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      console.log('LOAD INITIAL DATA RAN')
      dispatch(me())
      dispatch(updateRanks())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
