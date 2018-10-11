import React from 'react'
import Typography from '@material-ui/core/Typography'
import PlaceIcon from '@material-ui/icons/Place'
import {removeCountry} from '../../../../utilities'

const PlaceDetail = props => {
  const {place} = props
  return (
    <div className="flex-wrap content-wrap">
      <div className="media-wrap inline">
        <PlaceIcon style={{marginRight: '5px'}} />
      </div>
      <Typography style={{display: 'inline-block'}} variant="body2">
        {removeCountry(place.location.address)}
      </Typography>
      <Typography variant="body1">{place.name}</Typography>
    </div>
  )
}

export default PlaceDetail
