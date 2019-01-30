import React from 'react'

import TodoItem from './TodoItem';
import TodoEdit from './TodoEdit';

const TodosList = (props) =>
  <ul className="todos-list">
    {
      props.todos.map(todo => {
        return renderTodo(todo, props);
      })
    }
  </ul>;

const renderTodo = (todo, props) => {
  const { completed, id, text, edit } = todo;
  const { todosIncomplete, todosComplete, todosDelete,
    todosEditToggle, todosEditText } = props;
  return edit ?
    <TodoEdit
      key={id}
      id={id}
      text={text}
      todosEditText={todosEditText}
      todosEditToggle={todosEditToggle}
    />
    :
    <TodoItem
      key={id}
      id={id}
      completed={completed}
      text={text}
      todosEditToggle={todosEditToggle}
      todosIncomplete={todosIncomplete}
      todosComplete={todosComplete}
      todosDelete={todosDelete}
    />
}

export default TodosList;