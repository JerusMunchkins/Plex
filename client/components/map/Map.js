import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, withScriptjs, Marker} from 'react-google-maps'

const GMap = props => {
  const {lat, lng} = props.coordinates
  const places = props.places
  const homes = props.homes

  return (
    <GoogleMap
      center={new google.maps.LatLng(lat, lng)}
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
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ]
        // clickableIcons: false
      }}
    >
      {homes &&
        homes.map(marker => (
          <Marker
            icon={'http://maps.google.com/mapfiles/kml/pal3/icon56.png'}
            position={{lat: marker.location.lat, lng: marker.location.lng}}
            key={marker.id}
          />
        ))}

      {places.map(marker => (
        <Marker
          icon={'http://maps.google.com/mapfiles/kml/pal4/icon47.png'}
          position={{lat: marker.location.lat, lng: marker.location.lng}}
          key={marker.id}
        />
      ))}
    </GoogleMap>
  )
}

const mapState = state => {
  const {coordinates, homes, places, selectedCategories} = state

  return {
    coordinates,
    homes,
    places,
    selectedCategories
  }
}

export default connect(mapState)(withScriptjs(withGoogleMap(GMap)))
