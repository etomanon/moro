import React from "react";

import Radio from './Radio';

const Filter = ({ filterOptions, selected, onChange }) =>
  <div className="filter">
    {
      filterOptions.map(option => {
        return (
          <div
            key={option}
            className="filter__item"
          >
            <Radio
              selected={selected}
              value={option}
              onChange={e => onChange(e.target.value)}
            />
          </div>
        );
      })
    }
  </div>;

export default Filter;
