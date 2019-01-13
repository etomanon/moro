import axios from 'axios';

export const TODOS_GET = 'TODOS_GET';
export const TODOS_ADD = 'TODOS_ADD';
export const TODOS_DELETE = 'TODOS_DELETE';
export const TODOS_DELETE_LOCALLY = 'TODOS_DELETE_LOCALLY';
export const TODOS_COMPLETE = 'TODOS_COMPLETE';
export const TODOS_COMPLETE_LOCALLY = 'TODOS_COMPLETE_LOCALLY';
export const TODOS_INCOMPLETE = 'TODOS_INCOMPLETE';
export const TODOS_INCOMPLETE_LOCALLY = 'TODOS_INCOMPLETE_LOCALLY';
export const TODOS_COUNT_COMPLETED = 'TODOS_COUNT_COMPLETED';

export const TODOS_FILTER = 'TODOS_FILTER';
export const FILTER_ALL = 'All';
export const FILTER_ACTIVE = 'Active';
export const FILTER_COMPLETED = 'Completed';
export const FILTER_OPTIONS = [FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED];

export const TODOS_ERROR = 'TODOS_ERROR';
export const TODOS_EDIT_TOGGLE = 'TODOS_EDIT_TOGGLE';
export const TODOS_EDIT_TEXT = 'TODOS_EDIT_TEXT';
export const TODOS_EDIT_TEXT_LOCALLY = 'TODOS_EDIT_TEXT_LOCALLY';

// redux-promise-middleware defaults
export const PENDING = '_PENDING';
export const FULFILLED = '_FULFILLED';
export const REJECTED = '_REJECTED';

const baseUrl = 'http://localhost:8080';

export const todosGet = (url = `${baseUrl}/todos`) => {
  const payload = axios.get(url);
  return {
    type: TODOS_GET,
    payload
  };
}

export const todosAdd = text => {
  const payload = axios.post(
    `${baseUrl}/todos`,
    { text }
  );
  return {
    type: TODOS_ADD,
    payload
  };
}

export const todosDelete = id => {
  return dispatch => {
    const payload = axios.delete(`${baseUrl}/todos/${id}`);
    dispatch(todosDeleteServer(payload));
    dispatch(todosCountCompleted(payload));
    payload
      .then(response => {
        if (response.status === 200) dispatch(todosDeleteNow(id));
      });
  }
}

export const todosDeleteAll = filter => {
  return dispatch => {
    const completed = axios.get(`${baseUrl}/todos/completed`);
    completed
      .then(response => {
        const ids = response.data.map(item => item.id);
        const deleteAll = ids.map(id => dispatch(todosDelete(id)));
        return Promise.all(deleteAll);
      })
      .catch(err => dispatch(todosError(err.message)));
  }
}

const todosDeleteServer = payload => {
  return {
    type: TODOS_DELETE,
    payload
  }
}

export const todosDeleteNow = id => {
  return {
    type: TODOS_DELETE_LOCALLY,
    payload: id
  }
}


export const todosComplete = id => {
  return dispatch => {
    const payload = axios.post(`${baseUrl}/todos/${id}/complete`);
    dispatch({
      type: TODOS_COMPLETE,
      payload
    });
    dispatch({
      type: TODOS_COMPLETE_LOCALLY,
      payload: id
    });
    dispatch(todosCountCompleted(payload));
  }
}

export const todosCompleteAll = filter => {
  return dispatch => {
    const incompleted = axios.get(`${baseUrl}/todos/incompleted`);
    incompleted
      .then(response => {
        const ids = response.data.map(item => item.id);
        const completeAll = ids.map(id => dispatch(todosComplete(id)));
        return Promise.all(completeAll);
      })
      .then(() => {
        dispatch(todosFilter(filter));
      })
      .catch(err => dispatch(todosError(err.message)));
  }
}

export const todosIncomplete = id => {
  return dispatch => {
    const payload = axios.post(`${baseUrl}/todos/${id}/incomplete`);
    dispatch({
      type: TODOS_INCOMPLETE,
      payload
    });
    dispatch({
      type: TODOS_INCOMPLETE_LOCALLY,
      payload: id
    });
    dispatch(todosCountCompleted(payload));
  }
}

export const todosFilter = filter => {
  return dispatch => {
    dispatch({
      type: TODOS_FILTER,
      payload: filter
    });
    switch (filter) {
      case FILTER_ALL:
        return dispatch(todosGet());
      case FILTER_ACTIVE:
        return dispatch(todosGet(`${baseUrl}/todos/incompleted`));
      case FILTER_COMPLETED:
        return dispatch(todosGet(`${baseUrl}/todos/completed`));
      default:
        return dispatch(todosGet());
    }
  }
}

const todosError = err => {
  return {
    type: TODOS_ERROR,
    payload: {
      message: err
    }
  };
}

export const todosCountCompleted = (actionBefore = Promise.resolve()) => {
  return dispatch => {
    actionBefore
      .then(() => {
        const payload = axios.get(`${baseUrl}/todos/completed`);
        dispatch({
          type: TODOS_COUNT_COMPLETED,
          payload
        });
      })
  }
}


export const todosEditToggle = id => {
  return {
    type: TODOS_EDIT_TOGGLE,
    payload: id
  };
}

export const todosEditText = (id, text) => {
  return dispatch => {
    const payload = axios.post(
      `${baseUrl}/todos/${id}`,
      { text }
    );
    dispatch({
      type: TODOS_EDIT_TEXT,
      payload
    });
    dispatch({
      type: TODOS_EDIT_TEXT_LOCALLY,
      payload: {
        id,
        text
      }
    });
  }
}