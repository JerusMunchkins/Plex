import axios from 'axios'

const FETCH_ALL_HOME_PLACES_SUCCESS = 'FETCH_ALL_HOME_PLACES_SUCCESS'
// const FETCH_ONE_HOME_PLACES_SUCCESS = 'FETCH_ONE_HOME_PLACES_SUCCESS'
const FETCH_HOME_PLACES_REQUEST = 'FETCH_HOME_PLACES_REQUEST'
const FETCH_HOME_PLACES_ERROR = 'FETCH_HOME_PLACES_ERROR'
const DELETED_HOME_IN_HOME_PLACES = 'DELETED_HOME_IN_HOME_PLACES'

const fetchAllHomePlacesSuccess = homePlaces => ({
  type: FETCH_ALL_HOME_PLACES_SUCCESS,
  homePlaces
})
// const fetchOneHomePlacesSuccess = homePlaces => ({
//   type: FETCH_ONE_HOME_PLACES_SUCCESS,
//   homePlaces
// })
const fetchHomePlacesRequest = () => ({
  type: FETCH_HOME_PLACES_REQUEST
})
const fetchHomePlacesError = () => ({
  type: FETCH_HOME_PLACES_ERROR
})
const deletedHomeInHomePlaces = homeId => ({
  type: DELETED_HOME_IN_HOME_PLACES,
  homeId
})

// fetches all home_places for all homes on intial login
export const fetchAllHomePlaces = userId => async dispatch => {
  try {
    dispatch(fetchHomePlacesRequest())
    const {data} = await axios.get(`/api/users/${userId}/home_places`)
    let homePlaces = {}
    data.forEach(homePlace => {
      homePlaces[homePlace.homeId] = {}
    })
    data.forEach(homePlace => {
      homePlaces[homePlace.homeId][homePlace.placeId] = homePlace
    })
    dispatch(fetchAllHomePlacesSuccess(homePlaces))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomePlacesError())
  }
}

// gets all homePlaces for one home (adding new home)
export const fetchOneHomePlaces = (userId, homeId) => async dispatch => {
  try {
    dispatch(fetchHomePlacesRequest())

    // get users places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)

    // with new homeId map over places to add to db
    const homePlacePromises = places.map(async place => {
      await axios.post('/api/homes/places', {
        homeId,
        placeId: place.id
      })
    })
    await Promise.all(homePlacePromises)

    // update store with new homePlaces
    dispatch(fetchAllHomePlaces(userId))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomePlacesError())
  }
}

export const deleteHomeInHomePlaces = homeId => dispatch => {
  try {
    dispatch(deletedHomeInHomePlaces(homeId))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  homePlaces: {},
  loaded: false,
  fetchingCategoryResults: false,
  errorFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_HOME_PLACES_SUCCESS:
      return {
        homePlaces: {...state.homePlaces, ...action.homePlaces},
        loaded: true,
        fetchingCategoryResults: false,
        errorFetching: false
      }
    // case FETCH_ONE_HOME_PLACES_SUCCESS:
    //   return {...state}
    // Phan: make sure you are updating the
    // 'homePlaces' key in the 'homePlaces' store
    // because I needed to make sure they are separated from the meta data keys
    case DELETED_HOME_IN_HOME_PLACES:
      const removedHomeState = {...state}
      delete removedHomeState.homePlaces[action.homeId]
      return removedHomeState
    case FETCH_HOME_PLACES_REQUEST:
      return {
        ...state,
        loaded: false,
        fetchingCategoryResults: true,
        errorFetching: false
      }
    case FETCH_HOME_PLACES_ERROR:
      return {
        ...state,
        loaded: false,
        fetchingCategoryResults: false,
        errorFetching: true
      }
    default:
      return state
  }
}
