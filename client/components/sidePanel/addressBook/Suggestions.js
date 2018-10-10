import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import {removeCountry, styleSuggestions} from '../../../utilities'

class Suggestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: !!this.props.suggestions[0]
    }
  }

  componentDidUpdate(pastProps) {
    const diffProps = this.props.suggestions !== pastProps.suggestions
    if (diffProps && this.props.suggestions[0]) {
      this.setState({visible: true})
    } else if (diffProps && !this.props.suggestions[0]) {
      this.setState({visible: false})
    }
  }

  render() {
    const {suggestions, getSuggestionItemProps, loading} = this.props
    const {visible} = this.state
    return visible ? (
      <div className="autocomplete-dropdown-container">
        <Paper elevation={1}>
          {suggestions.map((suggestion, i) => {
            const [name, address] = styleSuggestions(
              removeCountry(suggestion.description)
            )

            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item'
            const style = suggestion.active
              ? {
                  backgroundColor: '#ffffe8',
                  cursor: 'pointer',
                  padding: '8px 8px',
                  zIndex: '3'
                }
              : {
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  padding: '8px 8px',
                  zIndex: '3'
                }
            return (
              <div
                key={i}
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style
                })}
              >
                <Typography
                  style={{display: 'inline-block'}}
                  variant="subheading"
                >
                  {name}
                </Typography>
                <Typography
                  style={{display: 'inline-block', marginLeft: '5px'}}
                  variant="caption"
                >
                  {address}
                </Typography>
              </div>
            )
          })}
        </Paper>
      </div>
    ) : (
      <div />
    )
  }
}

export default Suggestions
