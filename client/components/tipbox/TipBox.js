import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import amber from '@material-ui/core/colors/amber'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  button: {
    backgroundColor: amber[700]
  }
})

class Tipbox extends React.Component {
  render() {
    const {classes, handleClose, handleExited, message, key, open} = this.props
    return (
      <div>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          onExited={handleExited}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button
              key="undo"
              size="small"
              onClick={handleClose}
              className={classes.button}
            >
              NEXT
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

Tipbox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tipbox)
