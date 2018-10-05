import React from 'react'
import {AddressBook, Categories} from '../../components'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class ScreensSidePanel extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {value} = this.state
    return (
      <div id="side-panel">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Address Book" />
            <Tab label="Filter Nearby Places" />
          </Tabs>
        </AppBar>

        {value === 0 && <AddressBook />}
        {value === 1 && <Categories />}
      </div>
    )
  }
}

export default ScreensSidePanel
