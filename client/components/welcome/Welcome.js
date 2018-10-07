import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl
} from '@material-ui/core/'
import {getCenter} from '../../store'
import {states} from '../../utilities'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  formControl: {
    margin: '0 0 0 8px',
    minWidth: 120
  }
})

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      state: ''
    }
  }

  handleChange = e => {
    const {name, value} = e.target
    e.preventDefault()
    this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {city, state} = this.state
    this.props.getCenter(city, state)
  }

  render() {
    const {city, state} = this.state
    const {classes} = this.props
    return (
      <div className="form form-welcome">
        <h1>Welcome to Loco</h1>
        <h3>Make your move</h3>
        <p>Enter the city of your next big move!</p>
        <div className="form-welcome">
          <div className="fields">
            <TextField
              name="city"
              label="City"
              value={city}
              onChange={this.handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="state-native">State</InputLabel>
              <Select
                native
                value={state}
                onChange={this.handleChange}
                inputProps={{
                  name: 'state',
                  id: 'state-native'
                }}
                className={classes.select}
              >
                {states.map((state, i) => (
                  <option key={i} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button variant="contained" onClick={this.handleSubmit}>
          Go
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    coordinates: state.coordinates.center
  }
}

const mapDispatch = dispatch => {
  return {
    getCenter: (city, state) => dispatch(getCenter(city, state))
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Welcome))
