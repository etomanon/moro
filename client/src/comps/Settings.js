import React from 'react'

import Filter from './Filter';

const Settings = ({ filterOptions, filter, todosFilter,
  todosCompleteAll, todosDeleteAll, itemsCompleted }) =>
  <div className="settings">
    <Filter
      filterOptions={filterOptions}
      selected={filter}
      onChange={todosFilter}
    />
    <button
      onClick={e => todosCompleteAll(filter)}
      className="u-mt-m"
    >
      Complete all tasks
          </button>
    <button
      onClick={e => todosDeleteAll(filter)}
      className="u-mt-m"
    >
      Delete completed tasks
          </button>
    <div className="u-mt-m">
      Completed tasks: {itemsCompleted}
    </div>
  </div>

export default Settings;
