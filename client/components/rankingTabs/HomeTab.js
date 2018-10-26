import React from 'react'
import {connect} from 'react-redux'
import {HomeCard, PlaceInfo} from '..'

class HomeTab extends React.Component {
  render() {
    return this.props.userId && this.props.homeId ? (
      <div id="home-info">
        <HomeCard rank={this.props.rank} homeId={this.props.homeId} />
        <PlaceInfo homeId={this.props.homeId} />
      </div>
    ) : (
      <div />
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(HomeTab)
