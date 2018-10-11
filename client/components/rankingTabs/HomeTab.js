import React from 'react'
import {connect} from 'react-redux'
import {HomeCard, PlaceInfo} from '..'

class HomeTab extends React.Component {
  render() {
    return this.props.homeId ? (
      <div id="home-info">
        <HomeCard homeId={this.props.homeId} />
        <PlaceInfo homeId={this.props.homeId} />
      </div>
    ) : (
      <h1>Add a place</h1>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(HomeTab)
