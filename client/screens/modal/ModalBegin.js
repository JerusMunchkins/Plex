import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Modal, withStyles, Slide} from '@material-ui/core'

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

class ModalBegin extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: true
    }
  }
  handleSlide = () => {
    this.setState(state => ({checked: !state.checked}))
  }

  render() {
    const {classes} = this.props
    const {checked} = this.state
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!this.props.center.lat}
        >
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <div className={classes.paper}>
              <Welcome handleSlide={this.handleSlide} />
            </div>
          </Slide>
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

ModalBegin.propTypes = {
  classes: PropTypes.object.isRequired
}

const ScreensModalBegin = withStyles(styles)(ModalBegin)

export default connect(mapState)(ScreensModalBegin)
