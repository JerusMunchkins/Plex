import React from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../../../store'
import AddressCard from './AddressCard'

class HomesList extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchHomes(this.props.userId)
    }
  }

  sortHomes() {
    const {homes} = this.props
    return homes.sort((a, b) => a.id - b.id)
  }

  render() {
    return this.props.userId ? (
      <ul className="list homes-list">
        {this.sortHomes(this.props.homes).map(home => {
          return (
            <li className="li-item" key={home.id}>
              <AddressCard home={home} />
            </li>
          )
        })}
      </ul>
    ) : (
      <div>
        <p>Add addresses</p>
        <small>e.g. apartments, mom's house, pet hospital</small>
      </div>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id, homes: state.homes})

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomesList)
