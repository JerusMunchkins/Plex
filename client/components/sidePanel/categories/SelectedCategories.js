import React from 'react'
import {connect} from 'react-redux'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import {fetchSelectedCategories} from '../../../store'
import CategoryChips from './CategoryChips'

class SelectedCategories extends React.Component {
  render() {
    const {
      selectedCategories,
      selectedCategoriesErrored,
      selectedCategoriesFetching
    } = this.props

    if (selectedCategoriesErrored) {
      return <p>Sorry! There was an error loading your selected filters</p>
    }

    if (selectedCategoriesFetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <ul
              className="list selected-categories"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {provided.placeholder}
              {selectedCategories &&
                this.props.userId &&
                selectedCategories.map((category, index) => {
                  return (
                    <Draggable
                      draggableId={category.priority}
                      index={index}
                      key={category.label}
                    >
                      {(provided, snapshot) => (
                        <li
                          className="list-items"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CategoryChips
                            chipId={category.categoryId || category.placeId}
                            placeId={category.placeId}
                            label={category.label.replace(/_/g, ' ')}
                            priority={category.priority}
                            index={index}
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                })}
            </ul>
          )}
        </Droppable>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    selectedCategoriesErrored,
    selectedCategoriesFetching,
    selectedCategories
  } = state.selectedCategories

  return {
    userId: state.user.id,
    selectedCategoriesErrored,
    selectedCategoriesFetching,
    selectedCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedCategories: userId => dispatch(fetchSelectedCategories(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategories)
