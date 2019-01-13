import {
  PENDING, FULFILLED, REJECTED, FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED,
  TODOS_GET, TODOS_ADD, TODOS_DELETE, TODOS_DELETE_LOCALLY, TODOS_COMPLETE,
  TODOS_COMPLETE_LOCALLY, TODOS_INCOMPLETE, TODOS_INCOMPLETE_LOCALLY,
  TODOS_FILTER, TODOS_ERROR, TODOS_COUNT_COMPLETED, TODOS_EDIT_TOGGLE,
  TODOS_EDIT_TEXT, TODOS_EDIT_TEXT_LOCALLY
} from '../actions/todos';

const pending = (state) => {
  return {
    ...state,
    pending: true,
    error: false,
    errorText: ''
  }
}

const rejected = (state, action) => {
  return {
    ...state,
    pending: false,
    error: true,
    errorText: action.payload.message
  }
}

// toggle completed status and keep filtered only
const toggleCompleted = (state, action) => {
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
const isVisible = (filter, item) => {
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

const todos = (state = {
  items: [],
  itemsCompleted: 0,
  error: false,
  errorText: '',
  pending: false,
  filter: FILTER_ALL
}, action) => {
  switch (action.type) {
    case TODOS_GET + PENDING:
    case TODOS_ADD + PENDING:
    case TODOS_DELETE + PENDING:
    case TODOS_COMPLETE + PENDING:
    case TODOS_INCOMPLETE + PENDING:
    case TODOS_COUNT_COMPLETED + PENDING:
    case TODOS_EDIT_TEXT + PENDING:
      return pending(state);
    case TODOS_GET + REJECTED:
    case TODOS_ADD + REJECTED:
    case TODOS_DELETE + REJECTED:
    case TODOS_COMPLETE + REJECTED:
    case TODOS_INCOMPLETE + REJECTED:
    case TODOS_ERROR:
    case TODOS_COUNT_COMPLETED + REJECTED:
    case TODOS_EDIT_TEXT + REJECTED:
      return rejected(state, action);
    case TODOS_GET + FULFILLED:
      return {
        ...state,
        items: action.payload.data,
        pending: false
      };
    case TODOS_ADD + FULFILLED:
      return {
        ...state,
        items: isVisible(state.filter, action.payload.data) ?
          [action.payload.data, ...state.items]
          :
          state.items,
        pending: false
      };
    case TODOS_DELETE + FULFILLED:
    case TODOS_COMPLETE + FULFILLED:
    case TODOS_INCOMPLETE + FULFILLED:
      return {
        ...state,
        pending: false
      };
    case TODOS_DELETE_LOCALLY:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case TODOS_COMPLETE_LOCALLY: {
      return {
        ...state,
        items: toggleCompleted(state, action)
      }
    }
    case TODOS_INCOMPLETE_LOCALLY: {
      return {
        ...state,
        items: toggleCompleted(state, action)
      }
    }
    case TODOS_COUNT_COMPLETED + FULFILLED:
      return {
        ...state,
        itemsCompleted: action.payload.data.length
      };
    case TODOS_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case TODOS_EDIT_TOGGLE:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ?
            { ...item, edit: !item.edit }
            :
            item
        )
      }
    case TODOS_EDIT_TEXT_LOCALLY:
      const { id, text } = action.payload;
      return {
        ...state,
        items: state.items.map(
          item => item.id === id ?
            { ...item, edit: false, text }
            :
            item
        )
      }
    default:
      return state;
  }
}

export default todos;

// todos item shape:
// id": "f7a67fb0-76bd-11e7-be2e-8fe734dbe800",
// "text": "Udělat API",
// "completed": true,
// "createdDate": 1501594393387,
// "completedDate": 1501594873717
