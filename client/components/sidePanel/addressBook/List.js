import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import {fetchHomes, fetchPlaces} from '../../../store'
import AddressCard from './AddressCard'
import {sort} from '../../../utilities'

const styles = theme => ({
  progress: {
    position: 'absolute'
  }
})

class List extends React.Component {
  render() {
    const {list, name, children, classes, fetching} = this.props

    return !list ? (
      children
    ) : (
      <div>
        <ul className="list">
          {' '}
          {sort(list).map(item => {
            return (
              <li className="li-item" key={item.id}>
                {' '}
                {name === 'homes' ? (
                  <AddressCard home={item} />
                ) : (
                  <AddressCard place={item} />
                )}
              </li>
            )
          })}
        </ul>
        {fetching && (
          <div className="flex-container menu-buttons">
            <CircularProgress className={classes.progress} color="secondary" />
          </div>
        )}
      </div>
    )
  }
}

const mapHomes = state => ({
  userId: state.user.id,
  list: state.homes,
  places: state.places,
  name: 'homes'
})

const mapPlaces = state => ({
  userId: state.user.id,
  list: state.places,
  name: 'places',
  fetching: state.selectedCategories.selectedCategoriesFetching
})

const mapHomesDispatch = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId))
  }
}

const mapPlacesDispatch = dispatch => {
  return {
    fetchPlaces: userId => dispatch(fetchPlaces(userId))
  }
}

export const HomesList = connect(mapHomes, mapHomesDispatch)(
  withStyles(styles)(List)
)
export const PlacesList = connect(mapPlaces, mapPlacesDispatch)(
  withStyles(styles)(List)
)
