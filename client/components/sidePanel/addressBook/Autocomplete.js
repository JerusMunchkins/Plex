import React from 'react'
import {connect} from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import {postHome, postPlace, getRanks, updateRanks} from '../../../store'
import {withScriptjs} from 'react-google-maps'
import {renderFuncSearch, rankHomes as ranker} from '../../../utilities'

const styles = theme => ({
  button: {
    width: '20px',
    height: '20px',
    minHeight: '38px',
    minWidth: '38px'
  }
})

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {address: ''}
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setState({address: ''})
    }
  }

  handleChange = address => {
    this.setState({address})
  }

  rankHomes = () => {
    const {homes, homeCategories, homePlaces, selectedCategories} = this.props
    const data = ranker(
      homes,
      homeCategories,
      homePlaces,
      selectedCategories.selectedCategories
    )
    return data
  }

  handleClick = async event => {
    const {address} = this.state
    const {
      userId,
      type,
      homes,
      homeCategories,
      homePlaces,
      selectedCategories
    } = this.props
    const homesIdList = homes.map(home => home.id)
    const name = type === 'Place' ? address.split(',')[0] : ''
    try {
      this.setState({address})
      const [res] = await geocodeByAddress(address)
      const {lat, lng} = await getLatLng(res)

      this.props[`post${type}`]({
        userId,
        address,
        name,
        lat,
        lng,
        homesIdList
      })
        .then(() => {
          this.setState({address: ''})
        })
        .then(() => {
          const data = this.rankHomes(
            homes,
            homeCategories,
            homePlaces,
            selectedCategories.selectedCategories
          )
          this.props.getRanks(data)
        })

      // if (type === 'Home') {

      // }
    } catch (err) {
      console.error(err)
    }
  }

  handleSelect = address => {
    this.setState({address})
  }

  render() {
    const {classes} = this.props

    return (
      <div className="search-wrap">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          style={{width: '100%'}}
        >
          {renderFuncSearch(this.props.type)}
        </PlacesAutocomplete>
        <Button
          variant="fab"
          color="secondary"
          aria-label="Add"
          size="small"
          className={classes.button}
          disabled={this.state.address ? false : true}
          onClick={this.handleClick}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  homes: state.homes,
  homeCategories: state.homeCategories,
  homePlaces: state.homePlaces,
  selectedCategories: state.selectedCategories
})

const mapDispatchToProps = dispatch => ({
  postHome: payload => dispatch(postHome(payload)),
  postPlace: payload => dispatch(postPlace(payload)),
  getRanks: rankData => dispatch(getRanks(rankData)),
  updateRanks: data => dispatch(updateRanks(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withScriptjs(withStyles(styles)(Autocomplete))
)
