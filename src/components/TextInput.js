import React from 'react'

const TextInput = ({ label, inputValue }) => {

  // eslint-disable-next-line
  const removeReset = ({ reset: _, ...clone }) => clone

  return (
    <div className='form__field form__field--text'>
      <label>{label}</label>
      <input
        data-cy="tip-url"
        id={`input-${label}`}
        {...removeReset(inputValue)}
      />
    </div>
  )
}

export default TextInput
