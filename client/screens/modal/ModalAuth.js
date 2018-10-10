import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import {Login, Signup} from '../../components'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
})

const ModalAuth = props => {
  const {classes, history, type} = props
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      onBackdropClick={() => history.push('/home')}
    >
      <div className={classes.paper}>
        {type === 'login' ? <Login /> : <Signup />}
      </div>
    </Modal>
  )
}

ModalAuth.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapLogin = state => ({type: 'login'})
const mapSignup = state => ({type: 'signup'})

export const ModalLogin = connect(mapLogin)(withStyles(styles)(ModalAuth))
export const ModalSignup = connect(mapSignup)(withStyles(styles)(ModalAuth))
