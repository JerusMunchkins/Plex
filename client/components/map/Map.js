import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, withScriptjs} from 'react-google-maps'
import MarkerInfo from './MarkerInfo'
import {getBounds} from '../../store'
import {flattenHomeCategoryResults} from '../../utilities'

class GMap extends React.Component {
  componentDidUpdate = async prevProps => {
    const {userId, homes, places, homeId, categoryResults} = this.props
    const homeDeleted = homes.length < prevProps.homes.length
    const placeDeleted = places.length < prevProps.places.length
    let bounds
    try {
      if (!userId) {
        return
      } else if (homeDeleted || placeDeleted) {
        return
      } else if (homes !== prevProps.homes || places !== prevProps.places) {
        bounds = await this.props.getBounds([...homes, ...places])
      } else if (homeId !== prevProps.homeId) {
        const categoryResultsObj = categoryResults[homeId]
        const {lat, lng} = homes.find(home => home.id === homeId).location
        const markers = flattenHomeCategoryResults(categoryResultsObj)
        bounds = await this.props.getBounds(markers, {lat, lng})
      }
      this.refs.map.fitBounds(bounds)
    } catch (err) {
      console.error('An error occurred in Google maps')
    }
  }

  // Assigns the right icon depending on the category
  returnCategoryIcon = function(arr) {
    let categories = {
      supermarket: 'icons/carrot.png',
      gym: 'icons/dumbbell.png',
      laundry: 'icons/washing-machine.png',
      pharmacy: 'icons/medicine.png',
      library: 'icons/book.png',
      church: 'icons/church.png',
      mosque: 'icons/mosque.png',
      synagogue: 'icons/synagogue.png',
      hindu_temple: 'icons/temple.png',
      bus_station: 'icons/bus-stop.png',
      train_station: 'icons/train.png',
      subway_station: 'icons/metro.png'
    }

    for (let i = 0; arr.length; i++) {
      if (Object.keys(categories).includes(arr[i])) {
        return categories[arr[i]]
      }
    }
  }

  render() {
    const {places, homes, center, categoryResults} = this.props

    // Maps all locations into a single array
    let allLocations = []

    for (let home in categoryResults) {
      if (categoryResults.hasOwnProperty(home)) {
        for (let category in categoryResults[home]) {
          if (categoryResults[home].hasOwnProperty(category)) {
            for (let i = 0; i < categoryResults[home][category].length; i++) {
              let item = categoryResults[home][category][i]
              allLocations.push(item)
            }
          }
        }
      }
    }

    // Removes duplicate locations
    let locationsForMarkers = allLocations.filter(function(obj, index, self) {
      return (
        index ===
        self.findIndex(function(t) {
          return t.vicinity === obj.vicinity
        })
      )
    })

    return (
      <GoogleMap
        ref="map"
        center={center}
        defaultZoom={13}
        defaultOptions={{
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon'
            }
          ]
        }}
      >
        {homes &&
          homes.map(marker => (
            <MarkerInfo
              icon="icons/house.png"
              position={{lat: marker.location.lat, lng: marker.location.lng}}
              image={marker.imgUrl}
              name={marker.name}
              address={marker.location.address}
              price={marker.price}
              key={marker.id}
            />
          ))}
        {places.map(marker => (
          <MarkerInfo
            icon="icons/star.png"
            position={{lat: marker.location.lat, lng: marker.location.lng}}
            name={marker.name}
            address={marker.location.address}
            key={marker.id}
          />
        ))}
        {locationsForMarkers &&
          locationsForMarkers.map(marker => (
            <MarkerInfo
              icon={this.returnCategoryIcon(marker.types)}
              position={{
                lat: marker.geometry.location.lat,
                lng: marker.geometry.location.lng
              }}
              name={marker.name}
              address={marker.vicinity}
              key={marker.id}
            />
          ))}
      </GoogleMap>
    )
  }
}

const mapState = state => {
  const {
    coordinates,
    homes,
    places,
    selectedCategories,
    categoryResults
  } = state

  return {
    userId: state.user.id,
    center: coordinates.center,
    homeId: coordinates.selectedHomeId,
    placeId: coordinates.selectedPlaceId,
    homes,
    places,
    selectedCategories,
    categoryResults
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeCenter) => dispatch(getBounds(markers, homeCenter))
})

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(GMap)))
