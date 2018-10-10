import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Modal, withStyles, Typography, Button} from '@material-ui/core'
import {Login, Signup} from '../../components'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '575px',
    height: '575px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
})

class ModalAbout extends React.Component {
  constructor() {
    super()
    this.state = {
      auth: 'signup'
    }
  }

  handleClick = auth => {
    this.setState({auth})
  }

  render() {
    const {classes} = this.props
    return (
      <div className="flex-container">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!this.props.center.lat}
        >
          <div className={classes.paper}>
            <Typography variant="display2">Loco</Typography>
            <Typography style={{color: 'gray'}} variant="title" gutterBottom>
              Leverage the power of Google Maps to easily compare your options
              when looking for a new home
            </Typography>
            <Typography variant="body1" gutterBottom>
              It's simple: give us a list of places that matter to you, and
              we'll figure out which of your provided home listings is the best
              match.
            </Typography>
            <Typography
              style={{color: 'gray', marginTop: '35px'}}
              variant="title"
              gutterBottom
            >
              Get Started
            </Typography>

            <div className="flex-container welcome-modal">
              {this.state.auth === 'login' ? <Login /> : <Signup />}

              {this.state.auth === 'signup' ? (
                <div className="about-buttons welcome-col">
                  <div className="li-item">
                    <Button
                      variant="contained"
                      color="secondary"
                      href="/auth/google"
                    >
                      Log in with Google
                    </Button>
                  </div>
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
                      color="secondary"
                      href="/auth/google"
                    >
                      Sign up with Google
                    </Button>
                  </div>
                  <div className="li-item">
                    <Button
                      variant="contained"
                      style={{width: '100%'}}
                      onClick={() => this.handleClick('signup')}
                    >
                      Signup
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapState = state => ({center: state.coordinates.center})

ModalAbout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(ModalAbout))
