import React from 'react'

const Radio = ({ value, selected, onChange }) =>
  <>
    <input
      id={value}
      type="radio"
      name="filter"
      value={value}
      checked={selected === value}
      onChange={onChange}
      className="filter__input"
    />
    <label
      className="filter__label"
      htmlFor={value}
    >
      {value}
    </label>
  </>;

export default Radio;