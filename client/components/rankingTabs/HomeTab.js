import React from 'react'
import {connect} from 'react-redux'
import {HomeCard, PlaceInfo} from '..'

class HomeTab extends React.Component {
  render() {
    console.log('user id', this.props.userId)
    console.log('home id', this.props.homeId)
    return this.props.userId && this.props.homeId ? (
      <div id="home-info">
        <HomeCard rank={this.props.rank} homeId={this.props.homeId} />
        <PlaceInfo homeId={this.props.homeId} />
      </div>
    ) : (
      <h1>poop</h1>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(HomeTab)
