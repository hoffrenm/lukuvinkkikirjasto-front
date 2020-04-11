import React from 'react'

const Button = ({ buttonText, priority, type, cyDataAttribute }) => (
  <div className="button__container">
    <button
      className={`button button-${priority} button-${type}`}
      data-cy={cyDataAttribute}
      type={type}
    >
      {buttonText}
    </button>
  </div>
)

export default Button
