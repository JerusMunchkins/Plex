import React from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import NumberFormat from 'react-number-format'

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
        style={{width: '30px', height: '30px'}}
      >
        {this.state.isOpen && (
          <InfoWindow
            onCloseClick={this.onToggleOpen}
            onPositionChanged={this.onToggleOpen}
            style={{justifyContent: 'flex-start', overlow: 'unset'}}
          >
            <div className="all-center image-wrap">
              {image && (
                <img
                  height="75"
                  width="75"
                  src={image}
                  alt="Home image"
                  style={{marginLeft: '-21px'}}
                />
              )}
              <p className="info-p bold">{name}</p>
              <p className={`info-p ${image && `bold`}`}>{address}</p>
              {price && (
                <p className="info-p marker-p">
                  <NumberFormat
                    value={price}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="$"
                  />
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default MarkerInfo
