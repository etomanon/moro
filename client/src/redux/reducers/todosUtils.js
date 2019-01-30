import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../actions/todos';

export const pending = (state) => {
  return {
    ...state,
    pending: true,
    error: false,
    errorText: ''
  }
}

export const rejected = (state, action) => {
  return {
    ...state,
    pending: false,
    error: true,
    errorText: action.payload.message
  }
}

// toggle completed status and keep filtered only
export const toggleCompleted = (state, action) => {
  const { items, filter } = state;
  const { payload } = action;
  return items
    .map(item =>
      item.id === payload ?
        { ...item, completed: !item.completed }
        :
        item
    )
    .filter(item => item.id !== payload ? true : isVisible(filter, item))
}

// if todo item should be visible according to current filter
export const isVisible = (filter, item) => {
  switch (filter) {
    case FILTER_ALL:
      return true;
    case FILTER_ACTIVE:
      return !item.completed
    case FILTER_COMPLETED:
      return item.completed
    default:
      return true;
  }
}
