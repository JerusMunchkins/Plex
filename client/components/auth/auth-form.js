import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

class AuthForm extends React.Component {
  constructor() {
    super()
    this.state = {
      showPassword: false,
      first: '',
      last: '',
      email: '',
      password: ''
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
        <form onSubmit={handleSubmit} name={name} className="auth-form">
          {name === 'signup' && (
            <TextField
              onChange={this.handleChange('first')}
              id="first"
              value={this.state.first}
              label="First Name"
              margin="normal"
            />
          )}
          {name === 'signup' && (
            <TextField
              onChange={this.handleChange('last')}
              id="last"
              value={this.state.last}
              label="Last Name"
              margin="normal"
            />
          )}
          <TextField
            onChange={this.handleChange('email')}
            id="email"
            value={this.state.email}
            label="Email"
            margin="normal"
          />

          <TextField
            id="password"
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

const mapDispatch = (dispatch, ownProps) => {
  const {history, handleSlide} = ownProps
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      handleSlide()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let first = null
      let last = null
      if (formName === 'signup') {
        first = evt.target.first.value
        last = evt.target.last.value
        dispatch(auth(email, password, formName, first, last))
        history.push('/begin')
      } else {
        history.push('/home')
      }
      window.setTimeout(
        dispatch,
        500,
        auth(email, password, formName, first, last)
      )
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
