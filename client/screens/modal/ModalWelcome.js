import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Modal, withStyles} from '@material-ui/core'

import {Welcome} from '../../components'

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

class WelcomeModal extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!this.props.center.lat}
        >
          <div className={classes.paper}>
            <Welcome />
          </div>
        </Modal>
      </div>
    )
  }
}

const mapState = state => {
  return {
    center: state.coordinates.center
  }
}

WelcomeModal.propTypes = {
  classes: PropTypes.object.isRequired
}

const ScreensWelcomeModal = withStyles(styles)(WelcomeModal)

export default connect(mapState)(ScreensWelcomeModal)
