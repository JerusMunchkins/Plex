import axios from 'axios'

const FETCH_ALL_HOME_CATEGORIES_SUCCESS = 'FETCH_ALL_HOME_CATEGORIES_SUCCESS'
const FETCH_ONE_HOME_CATEGORY_SUCCESS = 'FETCH_ONE_HOME_CATEGORY_SUCCESS'
const FETCH_ALL_HOME_CATEGORIES_ONE_HOME_SUCCESS =
  'FETCH_ALL_HOME_CATEGORIES_ONE_HOME_SUCCESS'
const FETCH_HOME_CATEGORIES_REQUEST = 'FETCH_HOME_CATEGORIES_REQUEST'
const FETCH_HOME_CATEGORIES_ERROR = 'FETCH_HOME_CATEGORIES_ERROR'
const DELETED_ONE_HOME_CATEGORIES = 'DELETED_ONE_HOME_CATEGORIES'
const DELETED_HOME_IN_HOME_CATEGORIES = 'DELETED_HOME_IN_HOME_CATEGORIES'

const fetchAllHomeCategoriesSuccess = homeCategories => ({
  type: FETCH_ALL_HOME_CATEGORIES_SUCCESS,
  homeCategories
})
const fetchOneHomeCategorySuccess = (homeCategories, categoryId) => ({
  type: FETCH_ONE_HOME_CATEGORY_SUCCESS,
  homeCategories,
  categoryId
})
const fetchAllHomeCategoriesOneHomeSuccess = (homeCategories, homeId) => ({
  type: FETCH_ALL_HOME_CATEGORIES_ONE_HOME_SUCCESS,
  homeCategories,
  homeId
})
export const fetchHomeCategoriesRequest = () => ({
  type: FETCH_HOME_CATEGORIES_REQUEST
})
const fetchHomeCategoriesError = () => ({
  type: FETCH_HOME_CATEGORIES_ERROR
})
const deletedOneHomeCategories = (categoryId, homes) => ({
  type: DELETED_ONE_HOME_CATEGORIES,
  categoryId,
  homes
})
const deletedHomeInHomeCategories = homeId => ({
  type: DELETED_HOME_IN_HOME_CATEGORIES,
  homeId
})

// gets all homeCategories for user upon login
export const fetchAllHomeCategories = (
  homes,
  categoryResults,
  catIds
) => async dispatch => {
  try {
    dispatch(fetchHomeCategoriesRequest())

    const homeCategories = {}

    const homePromises = homes.map(async home => {
      homeCategories[home.id] = {}
      const start = {
        lat: home.location.lat,
        lng: home.location.lng
      }
      const catPromises = catIds.map(async item => {
        const end = {
          lat:
            categoryResults[home.id][item.categoryId][0].geometry.location.lat,
          lng:
            categoryResults[home.id][item.categoryId][0].geometry.location.lng
        }
        const walkDataGoogle = await axios.post('/api/google/distances', {
          start,
          end,
          mode: 'walking'
        })
        const transitDataGoogle = await axios.post('/api/google/distances', {
          start,
          end,
          mode: 'transit'
        })
        const bicyclingDataGoogle = await axios.post('/api/google/distances', {
          start,
          end,
          mode: 'bicycling'
        })
        const drivingDataGoogle = await axios.post('/api/google/distances', {
          start,
          end,
          mode: 'driving'
        })

        const infoPromises = Promise.all([
          walkDataGoogle,
          transitDataGoogle,
          bicyclingDataGoogle,
          drivingDataGoogle
        ])
        await infoPromises

        const walkData = walkDataGoogle.data.rows[0].elements[0]
        const transitData = transitDataGoogle.data.rows[0].elements[0]
        const bicyclingData = bicyclingDataGoogle.data.rows[0].elements[0]
        const drivingData = drivingDataGoogle.data.rows[0].elements[0]

        homeCategories[home.id][item.categoryId] = {
          name: categoryResults[home.id][item.categoryId][0].name,
          distanceText: walkData.distance.text,
          distanceValue: walkData.distance.value,
          walkingText: walkData.duration.text,
          walkingValue: walkData.duration.value,
          transitText: transitData.duration.text,
          transitValue: transitData.duration.value,
          bicyclingText: bicyclingData.duration.text,
          bicyclingValue: bicyclingData.duration.value,
          drivingText: drivingData.duration.text,
          drivingValue: drivingData.duration.value
        }
      })
      await Promise.all(catPromises)
    })
    await Promise.all(homePromises)

    dispatch(fetchAllHomeCategoriesSuccess(homeCategories))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomeCategoriesError())
  }
}

// gets homeCategories for each home (adding category)
export const fetchOneHomeCategory = (
  homes,
  categoryResults,
  category
) => async dispatch => {
  try {
    dispatch(fetchHomeCategoriesRequest())
    const {categoryId} = category
    const homeCategories = {}
    const homePromises = homes.map(async home => {
      homeCategories[home.id] = {}
      const start = {
        lat: home.location.lat,
        lng: home.location.lng
      }

      const end = {
        lat: categoryResults[home.id][+categoryId][0].geometry.location.lat,
        lng: categoryResults[home.id][+categoryId][0].geometry.location.lng
      }
      const walkDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'walking'
      })
      const transitDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'transit'
      })
      const bicyclingDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'bicycling'
      })
      const drivingDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'driving'
      })

      const infoPromises = Promise.all([
        walkDataGoogle,
        transitDataGoogle,
        bicyclingDataGoogle,
        drivingDataGoogle
      ])
      await infoPromises

      const walkData = walkDataGoogle.data.rows[0].elements[0]
      const transitData = transitDataGoogle.data.rows[0].elements[0]
      const bicyclingData = bicyclingDataGoogle.data.rows[0].elements[0]
      const drivingData = drivingDataGoogle.data.rows[0].elements[0]

      homeCategories[home.id][+categoryId] = {
        name: categoryResults[home.id][+categoryId][0].name,
        distanceText: walkData.distance.text,
        distanceValue: walkData.distance.value,
        walkingText: walkData.duration.text,
        walkingValue: walkData.duration.value,
        transitText: transitData.duration.text,
        transitValue: transitData.duration.value,
        bicyclingText: bicyclingData.duration.text,
        bicyclingValue: bicyclingData.duration.value,
        drivingText: drivingData.duration.text,
        drivingValue: drivingData.duration.value
      }
    })
    await Promise.all(homePromises)

    dispatch(fetchOneHomeCategorySuccess(homeCategories, categoryId))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomeCategoriesError())
  }
}

// gets all homeCategories for one home (adding home)
export const fetchAllHomeCategoriesOneHome = (
  categoryResults,
  start,
  homeId
) => async dispatch => {
  try {
    dispatch(fetchHomeCategoriesRequest())

    const homeCategories = {}
    const categoryIds = Object.keys(categoryResults)

    const categoryPromises = categoryIds.map(async categoryId => {
      const end = {
        lat: categoryResults[+categoryId][0].geometry.location.lat,
        lng: categoryResults[+categoryId][0].geometry.location.lng
      }

      const walkDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'walking'
      })
      const transitDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'transit'
      })
      const bicyclingDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'bicycling'
      })
      const drivingDataGoogle = await axios.post('/api/google/distances', {
        start,
        end,
        mode: 'driving'
      })

      await Promise.all([
        walkDataGoogle,
        transitDataGoogle,
        bicyclingDataGoogle,
        drivingDataGoogle
      ])

      const walkData = walkDataGoogle.data.rows[0].elements[0]
      const transitData = transitDataGoogle.data.rows[0].elements[0]
      const bicyclingData = bicyclingDataGoogle.data.rows[0].elements[0]
      const drivingData = drivingDataGoogle.data.rows[0].elements[0]

      homeCategories[categoryId] = {
        name: categoryResults[+categoryId][0].name,
        distanceText: walkData.distance.text,
        distanceValue: walkData.distance.value,
        walkingText: walkData.duration.text,
        walkingValue: walkData.duration.value,
        transitText: transitData.duration.text,
        transitValue: transitData.duration.value,
        bicyclingText: bicyclingData.duration.text,
        bicyclingValue: bicyclingData.duration.value,
        drivingText: drivingData.duration.text,
        drivingValue: drivingData.duration.value
      }
    })
    await Promise.all(categoryPromises)
    dispatch(fetchAllHomeCategoriesOneHomeSuccess(homeCategories, homeId))
  } catch (err) {
    console.error(err)
    dispatch(fetchHomeCategoriesError())
  }
}

// deletes category from homeCategory for each home
export const deleteOneHomeCategory = (categoryId, homes) => dispatch => {
  try {
    dispatch(fetchHomeCategoriesRequest())
    dispatch(deletedOneHomeCategories(categoryId, homes))
  } catch (err) {
    console.error(err)
  }
}

// removes all homeCategories for one home (remove home)
export const deleteHomeInHomeCategory = homeId => dispatch => {
  try {
    dispatch(deletedHomeInHomeCategories(homeId))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  homeCategories: {},
  loaded: false,
  fetchingHomeCategories: false,
  errorFetching: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_HOME_CATEGORIES_SUCCESS:
      return {
        homeCategories: action.homeCategories,
        loaded: true,
        fetchingHomeCategories: false,
        errorFetching: false
      }
    case FETCH_ONE_HOME_CATEGORY_SUCCESS:
      const newState = {...state}
      const homeIds = Object.keys(action.homeCategories)
      homeIds.forEach(homeId => {
        newState.homeCategories[homeId][+action.categoryId] =
          action.homeCategories[homeId][+action.categoryId]
      })
      return {
        ...newState,
        loaded: true,
        fetchingHomeCategories: false,
        errorFetching: false
      }
    case FETCH_ALL_HOME_CATEGORIES_ONE_HOME_SUCCESS:
      return {
        // ...state,
        homeCategories: {
          ...state.homeCategories,
          [action.homeId]: action.homeCategories
        },
        loaded: true,
        fetchingHomeCategories: false,
        errorFetching: false
      }
    case DELETED_HOME_IN_HOME_CATEGORIES:
      const removedHomeState = {...state}
      delete removedHomeState.homeCategories[action.homeId]
      return removedHomeState
    case FETCH_HOME_CATEGORIES_REQUEST:
      return {
        ...state,
        loaded: false,
        fetchingHomeCategories: true
      }
    case FETCH_HOME_CATEGORIES_ERROR:
      return {
        ...state,
        loaded: false,
        fetchingHomeCategories: false,
        errorFetching: true
      }
    case DELETED_ONE_HOME_CATEGORIES:
      const removedState = {...state}
      action.homes.forEach(home => {
        delete removedState.homeCategories[home.id][action.categoryId]
      })
      return {
        ...removedState,
        loaded: true,
        fetchingHomeCategories: false,
        errorFetching: false
      }
    default:
      return state
  }
}
