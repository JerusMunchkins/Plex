import axios from 'axios'
import {fetchSelectedCategories, fetchAllHomePlaces} from '../store'

const GOT_PLACES = 'GOT_PLACES'
const REMOVE_PLACES = 'REMOVE_PLACES'

const gotPlaces = places => ({type: GOT_PLACES, places})
export const removePlaces = () => ({type: REMOVE_PLACES})

export const fetchPlaces = userId => async dispatch => {
  try {
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error(err)
  }
}

export const postPlace = ({
  userId,
  name,
  address,
  lat,
  lng,
  homesIdList
}) => async dispatch => {
  try {
    // POST locations
    const {data: {id: locationId}} = await axios.post('/api/locations', {
      address,
      lat,
      lng
    })

    // POST places
    const {data: {id: placeId}} = await axios.post('/api/places', {
      name,
      locationId
    })

    // POST user_places
    await axios.post('/api/users/places', {userId, placeId})

    // POST home_places
    for (let i = 0; i < homesIdList.length; i++) {
      const homeId = homesIdList[i]
      await axios.post('/api/homes/places', {homeId, placeId})
    }

    // GET all home_places
    dispatch(fetchAllHomePlaces(userId))
    await dispatch(fetchSelectedCategories(userId))

    // GET all places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    await dispatch(gotPlaces(places))
  } catch (err) {
    console.error('An error occurred while posting a new place')
  }
}

export const putPlace = ({
  userId,
  placeId,
  address,
  name,
  lat,
  lng
}) => async dispatch => {
  let placePayload

  try {
    if (address) {
      const {data: {id: locationId}} = await axios.post('/api/locations', {
        address,
        lat,
        lng
      })
      placePayload = {locationId, name}
    } else {
      placePayload = {name}
    }

    await axios.put(`/api/places/${placeId}`, placePayload)

    // GET all places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error('An error occured while updating places')
  }
}

export const deletePlace = ({userId, placeId}) => async dispatch => {
  try {
    await axios.delete(`/api/places/${placeId}`)

    // GET all places
    const {data: {places}} = await axios.get(`/api/users/${userId}/places`)
    dispatch(gotPlaces(places))
  } catch (err) {
    console.error('An error occurred while deleting places', err)
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PLACES:
      return action.places
    case REMOVE_PLACES:
      return initialState
    default:
      return state
  }
}
