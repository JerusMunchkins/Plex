import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Clear from '@material-ui/icons/Clear'
import HomeDetail from './home/HomeDetail'
import HomeForm from './home/HomeForm'
import PlaceDetail from './place/PlaceDetail'
import PlaceForm from './place/PlaceForm'
import {
  deleteHome,
  deletePlace,
  deleteHomeInHomePlaces,
  deleteHomeInCategoryResults,
  deleteHomeInHomeCategory,
  deletePlaceInHomePlaces,
  fetchSelectedCategories
} from '../../../store'

const styles = theme => ({
  card: {
    width: '388px',
    position: 'relative'
  },
  title: {
    fontSize: '8px'
  },
  header: {
    right: 0,
    height: '0px',
    padding: '0px 0px'
  },
  cancel: {padding: '0px 0px'},
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    },
    padding: '0px'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class AddressCard extends React.Component {
  state = {expanded: false}

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
  }

  handleDelete = async () => {
    const {userId, homes} = this.props
    if (this.props.home) {
      const {id: homeId} = this.props.home
      this.props.deleteHome({userId, homeId})
      this.props.deleteHomeInHomePlaces(homeId)
      this.props.deleteHomeInCategoryResults(homeId)
      this.props.deleteHomeInHomeCategory(homeId)
    } else {
      const {id: placeId} = this.props.place
      await this.props.deletePlace({userId, placeId})
      await this.props.deletePlaceInHomePlaces(placeId, homes)
      this.props.fetchSelectedCategories(userId)
    }
  }

  render() {
    const {classes, home, place} = this.props

    return (
      <Card className={classes.card}>
        <CardContent>
          <CardHeader
            action={
              <IconButton
                className={classes.cancel}
                onClick={this.handleDelete}
              >
                <Clear />
              </IconButton>
            }
            className={classes.header}
          />
          {home && <HomeDetail home={home} />}
          {place && <PlaceDetail place={place} />}
        </CardContent>
        <div className="dropdown-wrap">
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
            style={{marginRight: '5px', marginBottom: '10px'}}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {home && <HomeForm home={home} />}
            {place && <PlaceForm place={place} />}
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

AddressCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({userId: state.user.id, homes: state.homes})

const mapDispatchToProps = dispatch => ({
  deleteHome: payload => dispatch(deleteHome(payload)),
  deletePlace: payload => dispatch(deletePlace(payload)),
  deleteHomeInHomePlaces: homeId => dispatch(deleteHomeInHomePlaces(homeId)),
  deleteHomeInCategoryResults: homeId =>
    dispatch(deleteHomeInCategoryResults(homeId)),
  deleteHomeInHomeCategory: homeId =>
    dispatch(deleteHomeInHomeCategory(homeId)),
  deletePlaceInHomePlaces: (placeId, homes) =>
    dispatch(deletePlaceInHomePlaces(placeId, homes)),
  fetchSelectedCategories: userId => dispatch(fetchSelectedCategories(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AddressCard)
)
