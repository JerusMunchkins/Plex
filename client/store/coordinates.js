import axios from 'axios'

const GOT_CENTER = 'GET_CENTER'
const GOT_BOUNDS = 'GOT_BOUNDS'
const SELECT_HOME = 'SELECT_HOME'
const UNSELECT_HOME = 'UNSELECT_HOME'
const SELECT_PLACE = 'SELECT_PLACE'
const UNSELECT_PLACE = 'UNSELECT_PLACE'

export const gotCenter = payload => ({
  type: GOT_CENTER,
  center: payload
})

export const selectHomeId = homeId => ({
  type: SELECT_HOME,
  homeId
})

export const selectPlaceId = placeId => ({
  type: SELECT_PLACE,
  placeId
})

const gotBounds = payload => ({
  type: GOT_BOUNDS,
  bounds: payload
})

// export const getCenter = (city, state) => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=,+${city},+${state}&key=${
//           process.env.GOOGLE_API_KEY
//         }`
//       )
//       const {lat, lng} = data.results[0].geometry.location
//       dispatch(gotCenter({lat, lng}))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

export const getBounds = (markers, centerLatLng) => {
  return async dispatch => {
    if (markers[0]) {
      try {
        const min = Math.min(markers.length, 5)
        const bounds = new google.maps.LatLngBounds()
        for (let i = 0; i < min; i++) {
          const {lat, lng} = markers[i].location
          await bounds.extend({lat, lng})
        }
        const center = centerLatLng || (await bounds.getCenter())
        dispatch(gotBounds(bounds))
        dispatch(gotCenter(center))
        return bounds
      } catch (err) {
        console.error('An error occurred while adjusting bounds', err)
      }
    }
  }
}

const initialState = {
  center: {
    lat: 41.8781,
    lng: -87.6298
  },
  bounds: [],
  selectedHomeId: null,
  selectedPlaceId: null
}

const coordinatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CENTER:
      return {...state, center: action.center}
    case GOT_BOUNDS:
      return {...state, bounds: action.bounds}
    case SELECT_HOME:
      return {...state, selectedHomeId: action.homeId}
    case UNSELECT_HOME:
      return {...state, selectedHomeId: null}
    case SELECT_PLACE:
      return {...state, selectedHomeId: action.homeId}
    case UNSELECT_PLACE:
      return {...state, selectedHomeId: null}
    default:
      return state
  }
}

export default coordinatesReducer
