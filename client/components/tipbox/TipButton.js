import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import Tipbox from './TipBox'

const styles = themes => ({
  root: {
    backgroundColor: '#f7bd00'
  },
  button: {
    width: '50px',
    height: '50px',
    fontSize: '10px',
    color: 'white',
    padding: 0
  },
  label: {
    flexDirection: 'column'
  }
})

class TipButton extends React.Component {
  queue = []

  state = {
    open: false,
    messageInfo: {}
  }

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime()
    })

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({open: false})
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  handleExited = () => {
    this.processQueue()
  }

  render() {
    const {classes} = this.props
    return (
      <div className="tips">
        <Button
          classes={{root: classes.root, label: classes.label}}
          className={classes.button}
          onClick={this.handleClick('message a')}
        >
          <div
            style={{
              marginTop: '-5px',
              transform: 'rotate(180deg)'
            }}
          >
            <WbIncandescentIcon />
          </div>
          <p className="show-tips">
            {this.state.open ? 'Hide Tips' : 'Show Tips'}
          </p>
        </Button>
        <Tipbox
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          handleExited={this.handleExited}
          messageInfo={this.state.message}
          open={this.state.open}
        />
      </div>
    )
  }
}

export default withStyles(styles)(TipButton)
