import React from 'react';
import classNames from 'classnames';

const TodoItem = ({ id, completed, text, todosEditToggle,
  todosIncomplete, todosComplete, todosDelete }) =>
  <li
    onDoubleClick={e => todosEditToggle(id)}
    className={classNames({
      "todos-list__item": true,
      "todos-list__item--complete": completed
    })}
  >
    <span
      onClick={e =>
        completed ?
          todosIncomplete(id)
          :
          todosComplete(id)
      }
      className="todos-list__complete"
    />
    {text}
    <span
      onClick={e => todosDelete(id)}
      className="todos-list__delete"
    >
      &times;
            </span>
  </li>;


export default TodoItem;