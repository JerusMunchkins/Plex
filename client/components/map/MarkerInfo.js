import React from 'react'
import {Marker, InfoWindow} from 'react-google-maps'

class MarkerInfo extends React.Component {
  state = {
    isOpen: false
  }

  onMarkerClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const {address, icon, image, name, position, price} = this.props
    return (
      <Marker
        icon={icon}
        position={{lat: position.lat, lng: position.lng}}
        onClick={this.onMarkerClick}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>
              {image ? (
                <img src={image} alt="Home image" height="256" width="256" />
              ) : (
                <div />
              )}
              <h1>{name}</h1>
              <p>{address}</p>
              {price ? <h4>{'$' + price}</h4> : <div />}
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default MarkerInfo
