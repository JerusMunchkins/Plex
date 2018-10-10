import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {
  withStyles,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'

class AuthForm extends React.Component {
  constructor() {
    super()
    this.state = {
      showPassword: false
    }
  }

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value})
  }

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}))
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <div className="welcome-col">
        <form onSubmit={handleSubmit} className="auth-form">
          {name === 'signup' && (
            <TextField
              onChange={this.handleChange('first')}
              id="standard-name"
              label="First Name"
              margin="normal"
            />
          )}
          {name === 'signup' && (
            <TextField
              onChange={this.handleChange('last')}
              label="Last Name"
              margin="normal"
            />
          )}
          <TextField
            onChange={this.handleChange('email')}
            label="Email"
            margin="normal"
          />

          <TextField
            id="outlined-adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{
              width: '100%',
              backgroundColor: '#3f51b5',
              marginTop: '10px',
              color: 'white'
            }}
            type="submit"
          >
            {displayName}
          </Button>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
