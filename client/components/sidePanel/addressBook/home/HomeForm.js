import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {renderFuncEdit} from '../../../../utilities'
import {putHome} from '../../../../store'
import NumberField from './NumberField'

const styles = theme => ({
  textField: {
    width: '100%'
  },
  input: {
    fontSize: '14px'
  }
})

class HomeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.home.location.address,
      price: this.props.home.price || 0,
      link: this.props.home.link || '',
      lat: 0,
      lng: 0
    }
  }

  handleChange = prop => {
    return event => {
      this.setState({[prop]: event.target.value})
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const {userId} = this.props
    const {id: homeId} = this.props.home
    let payload = {userId, homeId}
    if (this.state.lat === 0 && this.state.lng === 0) {
      let {price, link} = this.state
      price = price ? price : 0
      payload = {...payload, price, link}
    } else {
      payload = {...payload, ...this.state}
    }
    this.props.putHome(payload)
  }

  handleAutoChange = address => {
    this.setState({address})
  }

  handleAutoSelect = async address => {
    try {
      const [res] = await geocodeByAddress(address)
      const {lat, lng} = await getLatLng(res)
      this.setState({address, lat, lng})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {classes} = this.props
    const {address, price, link} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <PlacesAutocomplete
          value={address}
          onChange={this.handleAutoChange}
          onSelect={this.handleAutoSelect}
        >
          {renderFuncEdit}
        </PlacesAutocomplete>
        <TextField
          label="Price"
          value={price}
          className={classes.textField}
          placeholder="0"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: NumberField
          }}
          onChange={this.handleChange('price')}
        />
        <TextField
          label="URL"
          helperText="Add a hyperlink to your home listing"
          value={link}
          className={classes.textField}
          InputProps={{
            className: classes.input
          }}
          onChange={this.handleChange('link')}
        />
        <div className="flex-container flex-end">
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id})
const mapDispatchToProps = dispatch => ({
  putHome: payload => dispatch(putHome(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(HomeForm)
)
