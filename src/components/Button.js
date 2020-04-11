import React from 'react'

const Button = ({ buttonText, priority, type, cyDataAttribute, onClick }) => (
  <div className="button__container">
    <button
      className={`button button-${priority} button-${type}`}
      data-cy={cyDataAttribute}
      type={type}
      onClick={onClick}
    >
      {buttonText}
    </button>
  </div>
)

export default Button
