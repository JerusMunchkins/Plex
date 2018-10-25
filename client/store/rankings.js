const GOT_RANKS = 'GET_RANKS'
const UPDATED_RANKS = 'GET_RANKS'
const DELETED_RANKS = 'DELETE_RANKS'

const gotRanks = rankData => ({
  type: GOT_RANKS,
  rankData
})
const updatedRanks = () => ({
  type: UPDATED_RANKS
})
const deletedRanks = () => ({
  type: DELETED_RANKS
})

export const getRanks = rankData => async dispatch => {
  try {
    dispatch(gotRanks(rankData))
  } catch (err) {
    console.error(err)
  }
}
export const updateRanks = () => async dispatch => {
  try {
    dispatch(updatedRanks())
  } catch (err) {
    console.error(err)
  }
}
export const deleteRanks = () => async dispatch => {
  try {
    dispatch(deletedRanks())
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
        called: false
      }
    case DELETED_RANKS:
      return
    default:
      return state
  }
}
