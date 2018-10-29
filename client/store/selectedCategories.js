import axios from 'axios'

// ACTION TYPES

const FETCH_SELECTED_CATEGORIES_REQUEST = 'FETCH_SELECTED_CATEGORIES_REQUEST'
const FETCH_SELECTED_CATEGORIES_SUCCESS = 'FETCH_SELECTED_CATEGORIES_SUCCESS'
const FETCH_SELECTED_CATEGORIES_ERROR = 'FETCH_SELECTED_CATEGORIES_ERROR'
const ADD_NEW_SELECTED_FILTER = 'ADD_NEW_SELECTED_FILTER'
const REMOVE_SELECTED_FILTER = 'REMOVE_SELECTED_FILTER'
const REMOVE_SELECTED_CATEGORIES = 'REMOVE_SELECTED_CATEGORIES'

// ACTION CREATORS

const fetchSelectedCategoriesRequest = () => ({
  type: FETCH_SELECTED_CATEGORIES_REQUEST
})
export const fetchSelectedCategoriesSuccess = selectedCategories => ({
  type: FETCH_SELECTED_CATEGORIES_SUCCESS,
  payload: selectedCategories
})
const fetchSelectedCategoriesError = () => ({
  type: FETCH_SELECTED_CATEGORIES_ERROR
})
export const addNewSelectedFilter = category => ({
  type: ADD_NEW_SELECTED_FILTER,
  payload: category
})
export const removeSelectedCategories = () => ({
  type: REMOVE_SELECTED_CATEGORIES
})

// THUNK CREATORS

export const fetchSelectedCategories = userId => async dispatch => {
  try {
    dispatch(fetchSelectedCategoriesRequest())
    const {data} = await axios.get(`/api/categories/${userId}`)
    dispatch(fetchSelectedCategoriesSuccess(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchSelectedCategoriesError())
  }
}

export const postCategory = ({
  userId,
  priority,
  categoryId
}) => async dispatch => {
  try {
    await axios.post(`/api/categories/${userId}`, {priority, categoryId})
  } catch (err) {
    console.error('An error occurred while posting a category')
  }
}

export const deleteCategory = ({userId, categoryId, priority}) => async (
  dispatch,
  getState
) => {
  try {
    const {selectedCategories: {selectedCategories}} = getState()
    const newList = selectedCategories.reduce((result, item) => {
      if (item.priority < priority) {
        result.push(item)
        return result
      } else if (item.priority > priority) {
        result.push({...item, priority: item.priority - 1})
        return result
      } else {
        return result
      }
    }, [])
    await axios.delete(
      `/api/categories/${categoryId}/priority/${priority}/${userId}`
    )

    dispatch(fetchSelectedCategoriesSuccess(newList))
  } catch (err) {
    console.error('An error occurred while deleting a category')
  }
}

// INITIAL STATE

const initialState = {
  selectedCategoriesErrored: false,
  selectedCategoriesFetching: false,
  selectedCategories: []
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SELECTED_CATEGORIES_REQUEST:
      return {...state, selectedCategoriesFetching: true}
    case FETCH_SELECTED_CATEGORIES_ERROR:
      return {
        ...state,
        selectedCategoriesFetching: false,
        selectedCategoriesErrored: true
      }
    case FETCH_SELECTED_CATEGORIES_SUCCESS:
      return {
        ...state,
        selectedCategoriesFetching: false,
        selectedCategories: action.payload
      }
    case ADD_NEW_SELECTED_FILTER:
      return {
        ...state,
        selectedCategories: [...state.selectedCategories, action.payload]
      }
    case REMOVE_SELECTED_FILTER:
      return {
        ...state,
        selectedCategories: [
          ...state.selectedCategories.slice(0, action.payload),
          ...state.sselectedCategories.slice(action.payload + 1)
        ]
      }
    case REMOVE_SELECTED_CATEGORIES:
      return initialState
    default:
      return state
  }
}
