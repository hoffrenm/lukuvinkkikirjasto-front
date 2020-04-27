import React from 'react'
import Button from './Button'
import { useHistory } from 'react-router-dom'

const Tip = ({ tip, deleteTip, readTip }) => {
  const history = useHistory()

  return (
    <div
      id="tip-list-item"
      data-cy="tip-item"
      key={tip.id}
      className="tip-list-item"
    >
      <div className="tip-content">
        <div className="timestamp">{tip.createdAt.toLocaleString('fi-FI')}</div>

        {tip.read && (
          <div className="timestamp-read">
            Luettu {tip.readAt.toLocaleString('fi-FI')}
          </div>
        )}

        <h3>{tip.title}</h3>
        <a href={tip.url}>{tip.url}</a>

        <div className="tip-item__meta tip-item__meta--tags">
          {tip.tags.map((tag, index) => {
            return (
              <span key={`${index}-${tag}-${tip.id}`} className="tag_item">
                <span>{tag}</span>
                {index !== tip.tags.length - 1 && (
                  <span className="sep">,</span>
                )}
              </span>
            )
          })}
        </div>
        <Button
          onClick={() => deleteTip(tip)}
          buttonText="Poista"
          priority="secondary"
          type="button"
          cyDataAttribute="remove-tip"
        />
        {!tip.read && (
          <Button
            onClick={() => readTip(tip)}
            buttonText="Luettu"
            priority="secondary"
            type="button"
            cyDataAttribute="read-tip"
          />
        )}
        <Button
          onClick={() => history.push(`/tips/${tip.id}/edit`)}
          buttonText="Muokkaa"
          priority="secondary"
          type="button"
          cyDataAttribute="remove-tip"
        />
      </div>
    </div>
  )
}

export default Tip
