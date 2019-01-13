import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  todosGet, todosAdd, todosDelete, todosComplete, todosIncomplete,
  todosFilter, FILTER_OPTIONS, todosCompleteAll, todosDeleteAll,
  todosCountCompleted, todosEditToggle, todosEditText
} from './redux/actions/todos';

import Settings from './comps/Settings';
import InputForm from './comps/InputForm';
import ErrorMessage from './comps/ErrorMessage';
import TodosList from './comps/TodosList';

class App extends Component {
  componentDidMount() {
    const { todosGet, todosCountCompleted } = this.props;
    todosGet();
    todosCountCompleted();
  }
  render() {
    const { todosAdd, todosDelete, todosComplete, todosIncomplete, todosFilter,
      todosCompleteAll, todosDeleteAll, todosEditToggle, todosEditText
    } = this.props;
    const { items, itemsCompleted, error, errorText, filter } = this.props.todos;
    return (
      <main className="main">
        <h1 className="heading-primary u-center-text">Todos</h1>
        <Settings
          filterOptions={FILTER_OPTIONS}
          filter={filter}
          todosFilter={todosFilter}
          todosCompleteAll={todosCompleteAll}
          todosDeleteAll={todosDeleteAll}
          itemsCompleted={itemsCompleted}
        />
        <InputForm
          todosAdd={todosAdd}
        />
        <ErrorMessage
          error={error}
          errorText={errorText}
        />
        <TodosList
          todos={items}
          todosDelete={todosDelete}
          todosComplete={todosComplete}
          todosIncomplete={todosIncomplete}
          filter={filter}
          todosEditToggle={todosEditToggle}
          todosEditText={todosEditText}
        />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = {
  todosGet,
  todosAdd,
  todosDelete,
  todosComplete,
  todosIncomplete,
  todosFilter,
  todosCompleteAll,
  todosDeleteAll,
  todosCountCompleted,
  todosEditToggle,
  todosEditText
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
