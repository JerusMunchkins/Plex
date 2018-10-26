import {rankHomes} from '../utilities'

const GOT_RANKS = 'GET_RANKS'
const UPDATED_RANKS = 'GET_RANKS'
const DELETED_RANKS = 'DELETE_RANKS'

const gotRanks = rankData => ({
  type: GOT_RANKS,
  rankData
})
const updatedRanks = rankData => ({
  type: UPDATED_RANKS,
  rankData
})

export const getRanks = rankData => dispatch => {
  try {
    dispatch(gotRanks(rankData))
  } catch (err) {
    console.error(err)
  }
}
export const updateRanks = () => (dispatch, getState) => {
  try {
    const state = getState()
    const {homes, homeCategories, homePlaces, selectedCategories} = state
    const rankData = rankHomes(
      homes,
      homeCategories,
      homePlaces,
      selectedCategories.selectedCategories
    )
    dispatch(updatedRanks(rankData))
  } catch (err) {
    console.error(err)
  }
}
export const deleteRanks = homeId => (dispatch, getState) => {
  try {
    const state = getState()
    const rankings = state.rankings.data
    const homeKey = Object.keys(rankings).find(key => rankings[key] === homeId)
    delete rankings[homeKey]
    dispatch(gotRanks(rankings))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  data: {},
  called: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RANKS:
      return {
        data: {...action.rankData},
        called: true
      }
    case UPDATED_RANKS:
      return {
        ...state,
        data: {...action.rankData}
      }
    case DELETED_RANKS:
      return
    default:
      return state
  }
}
