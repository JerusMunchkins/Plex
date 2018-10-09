/* eslint-disable react/display-name */
import TextField from '@material-ui/core/TextField'
import React from 'react'
import axios from 'axios'
import {Suggestions} from './components'

export const renderFuncSearch = type => ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => {
  const text = type === 'Home' ? 'Add Homes' : 'Add Places'
  return (
    <div className="content-wrap">
      <TextField
        InputProps={{
          ...getInputProps({
            className: 'location-search-input',
            style: {fontSize: '20px'}
          })
        }}
        label={text}
        style={{width: '96%'}}
        className="text-field"
        variant="outlined"
      />
      <Suggestions
        suggestions={suggestions}
        getSuggestionItemProps={getSuggestionItemProps}
        loading={loading}
      />
    </div>
  )
}

export const renderFuncEdit = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => (
  <div className="content-wrap no-margins auto-form">
    <TextField
      InputProps={{
        ...getInputProps({
          className: 'location-search-input',
          style: {margin: '8px'}
        })
      }}
      label="Address"
      style={{width: '100%'}}
      className="text-field"
      variant="outlined"
    />

    <Suggestions
      suggestions={suggestions}
      getSuggestionItemProps={getSuggestionItemProps}
      loading={loading}
    />
  </div>
)

export const reorderAndShift = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  const shifted = result.map((item, index) => {
    return {...item, priority: index + 1}
  })
  return shifted
}

export const sort = arr => {
  return arr.sort((a, b) => a.id - b.id)
}

export const getUnselectedCategories = ({selected, categories}) => {
  const dictionary = selected.reduce((result, item) => {
    if (item.categoryId) {
      result[item.categoryId] = true
    }
    return result
  }, {})
  const unselected = categories.reduce((result, item) => {
    if (!dictionary[item.id]) result.push(item)
    return result
  }, [])
  return unselected
}

export const updateCategoriesInDb = async (event, {selected, userId}) => {
  if (selected && userId) {
    try {
      await axios.put(`/api/categories/${userId}`, {selected})
    } catch (err) {
      console.error('An error occured while updating selected categories')
    }
  }
}

export const flattenHomeCategoryResults = categoryResultsObj => {
  const markers = []
  for (let category in categoryResultsObj) {
    if (categoryResultsObj.hasOwnProperty(category)) {
      for (let i = 0; i < 5; i++) {
        markers.push(categoryResultsObj[category][i].geometry)
      }
    }
  }
  return markers
}

export const removeCountry = address => {
  const arr = address.split(',')
  return arr.slice(0, arr.length - 1).join(',')
}

export const states = [
  '',
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
]

export const getHomeRankings = (
  homeCategories,
  homePlaces,
  selectedCategories
) => {
  const homeKeys = Object.keys(homeCategories)
  const homeKeys2 = Object.keys(homePlaces)
  const length = selectedCategories.length
  const results = []
  for (let i = 0; i < homeKeys.length; i++) {
    console.log('homeKeys in homeCategories', homeKeys)
    console.log('homeKeys in homePlaces', homeKeys2)
    const homeId = homeKeys[i]
    for (let j = 0; j < length; j++) {
      results[i] = {homeId: homeId}
      const selected = selectedCategories[j]
      const list = selected.categoryId ? homeCategories : homePlaces
      const locationId = selected.categoryId
        ? selected.categoryId
        : selected.placeId
      // debugger
      const {distanceValue} = list[homeId][locationId]
      const score = selected.priority * distanceValue
      results[i].score = (results[i].score || 0) + score
    }
  }
  return results.sort((a, b) => a.score - b.score)
}
