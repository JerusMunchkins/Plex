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
import Typography from '@material-ui/core/Typography'

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
    const {name, displayName, handleSubmit, error, history} = this.props
    return (
      <div className="flex-container auth-wrap">
        <form onSubmit={handleSubmit} name={name} className="auth-form">
          {name === 'signup' && (
            <div>
              <Typography
                style={{
                  color: 'gray',
                  textAlign: 'center'
                }}
                variant="title"
                gutterBottom
              >
                Create an account
              </Typography>
              <TextField
                onChange={this.handleChange('first')}
                id="first"
                value={this.state.first}
                label="First Name"
                margin="normal"
                style={{width: '100%'}}
              />
              <TextField
                onChange={this.handleChange('last')}
                id="last"
                value={this.state.last}
                label="Last Name"
                margin="normal"
                style={{width: '100%'}}
              />
            </div>
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
          {name && (
            <Button
              style={{marginTop: '10px'}}
              variant="contained"
              color="secondary"
              href="/auth/google"
            >
              {displayName} with Google
            </Button>
          )}
          <div className="divider" />

          <hr />

          {displayName === 'signup' ? (
            <div className="about-buttons">
              <div className="li-item">
                <Button
                  variant="contained"
                  style={{width: '100%'}}
                  onClick={() => this.handleClick('login')}
                >
                  Login
                </Button>
              </div>
            </div>
          ) : (
            <div className="about-buttons welcome-col">
              <div className="li-item">
                <Button
                  variant="contained"
                  style={{width: '100%'}}
                  onClick={() => {
                    if (name === 'login') {
                      history.push('/signup')
                    } else {
                      history.push('/login')
                    }
                  }}
                >
                  {name === 'login' ? 'Sign Up' : 'Log In'}
                </Button>
              </div>
            </div>
          )}
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
  const {history} = ownProps
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let first = null
      let last = null

      if (formName === 'signup') {
        first = evt.target.first.value
        last = evt.target.last.value
      }

      dispatch(auth(email, password, formName, first, last))

      // let first = null
      // let last = null
      // if (formName === 'signup') {
      //   first = evt.target.first.value
      //   last = evt.target.last.value
      //   dispatch(auth(email, password, formName, first, last))
      //   history.push('/begin')
      // } else {
      //   history.push('/')
      // }
      // window.setTimeout(
      //   dispatch,
      //   500,
      //   auth(email, password, formName, first, last)
      // )
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
