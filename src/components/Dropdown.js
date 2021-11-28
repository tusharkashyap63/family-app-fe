import React from 'react';

export default function Dropdown({
  options = [],
  selected,
  setSelected,
  label = '',
  id = '',
}) {
  return (
    <>
      <label for={id}>{label}</label>
      <select
        className='custom-dropdown'
        value={selected}
        name={id}
        id={id}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </>
  );
}
