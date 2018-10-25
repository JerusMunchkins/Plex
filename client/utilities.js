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
  const text = type === 'Home' ? 'Add Homes...' : 'Add Places..'
  return (
    <div className="content-wrap">
      <TextField
        InputProps={{
          ...getInputProps({
            className: 'location-search-input',
            style: {fontSize: '20px', backgroundColor: 'white'}
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
          style: {margin: '8px', backgroundColor: 'white'}
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

export const styleSuggestions = suggestion => {
  const arr = suggestion.split(', ')
  const name = arr[0]
  const address = arr.slice(1).join(', ')
  return [name, address]
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

export const rankHomes = (homes, homeCategories, homePlaces, priorities) => {
  const homeIdScores = {}

  homes.forEach(home => {
    let score = 0

    priorities.forEach(item => {
      if (item.placeId) {
        score += homePlaces[home.id][item.placeId].distanceValue * item.priority
      } else {
        score +=
          homeCategories[home.id][item.categoryId].distanceValue * item.priority
      }
    })

    homeIdScores[score] = home.id
  })

  const sortedScores = sort(Object.keys(homeIdScores))

  const rankings = {}
  sortedScores.forEach((score, i) => {
    rankings[i] = homeIdScores[score]
  })

  console.log('RANKED HOMES UTIL')
  return rankings
}
