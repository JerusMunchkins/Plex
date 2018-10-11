import axios from 'axios'
import {
  fetchAllCategoryResults,
  fetchOneHomePlaces,
  fetchAllCategoryResultsOneHome
} from './index'
import {getStreetViewUrl} from '../../server/services'

const GOT_HOMES = 'GOT_HOMES'
const REMOVE_HOMES = 'REMOVE_HOMES'

const gotHomes = homes => ({type: GOT_HOMES, homes})
export const removeHomes = () => ({type: REMOVE_HOMES})

export const fetchHomes = userId => async dispatch => {
  try {
    const {data: {homes}} = await axios.get(`/api/users/${userId}/homes`)
    dispatch(gotHomes(homes))
    dispatch(fetchAllCategoryResults(userId, homes))
  } catch (err) {
    console.error(err)
  }
}

export const postHome = ({userId, address, lat, lng}) => async dispatch => {
  try {
    // POST locations
    const {data: {id: locationId}} = await axios.post('/api/locations', {
      address,
      lat,
      lng
    })

    // POST homes
    const {data: {id: homeId}} = await axios.post('/api/homes', {
      locationId
    })

    // POST user_homes
    await axios.post('/api/users/homes', {userId, homeId})

    // GET all homes
    const {data: {homes}} = await axios.get(`/api/users/${userId}/homes`)

    dispatch(fetchOneHomePlaces(userId, homeId))
    dispatch(fetchAllCategoryResultsOneHome(userId, homeId, {lat, lng}))
    await dispatch(gotHomes(homes))
    // await Promise.all([
    // ])
  } catch (err) {
    console.error('An error occurred while posting a new home')
  }
}

export const putHome = ({
  userId,
  homeId,
  address,
  lat,
  lng,
  price,
  link
}) => async dispatch => {
  let homePayload
  try {
    // POST locations
    // checks if address changed
    if (address) {
      const {data: {id: locationId}} = await axios.post('/api/locations', {
        address,
        lat,
        lng
      })
      homePayload = {locationId, link, price}
    } else {
      homePayload = {link, price}
    }

    // PUT homes
    await axios.put(`/api/homes/${homeId}`, homePayload)

    // GET all homes
    const {data: {homes}} = await axios.get(`/api/users/${userId}/homes`)
    dispatch(gotHomes(homes))
  } catch (err) {
    console.error('An error occurred while updating homes')
  }
}

export const deleteHome = ({userId, homeId}) => async dispatch => {
  try {
    await axios.delete(`/api/homes/${homeId}`)

    // GET all homes
    const {data: {homes}} = await axios.get(`/api/users/${userId}/homes`)
    dispatch(gotHomes(homes))
  } catch (err) {
    console.log('An error occurred while deleting homes')
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_HOMES:
      return action.homes
    case REMOVE_HOMES:
      return initialState
    default:
      return state
  }
}
