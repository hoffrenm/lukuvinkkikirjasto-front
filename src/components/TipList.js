import React from 'react'
import { connect } from 'react-redux'
import { removeTip, readTip } from '../reducers/tipReducer'
import Loading from './Loading'
import NoTips from './NoTips'
import Button from './Button'

const TipList = (props) => {
  const { processing, tipdata } = props.tips

  if (processing && tipdata.length === 0) {
    return <Loading />
  }

  if (tipdata.length === 0) {
    return <NoTips />
  }

  console.log('TipList: tipdata', tipdata)

  const byDescendingTime = (b, a) => a.createdAt - b.createdAt

  const deleteTip = async (tip) => {
    const ok = window.confirm(`Poistetaanko lukuvinkki '${tip.title}'?`)
    if (ok) {
      props.removeTip(tip.id)
    }
  }

  const readTip = async (tip) => {
    props.readTip(tip.id)
  }

  return (
    <div>
      <h2>Lukuvinkit</h2>
      <div id="tip-list">
        {tipdata.sort(byDescendingTime).map((tip) => {
          return (
            <div id="tip-list-item" data-cy="tip-item" key={tip.id} className="tip-list-item">
              <div className="tip-content">
                <div className="timestamp">
                  {tip.createdAt.toLocaleString('fi-FI')}
                </div>
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
                      <span
                        key={`${index}-${tag}-${tip.id}`}
                        className="tag_item"
                      >
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
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tips: state.tips,
  }
}

const connectedTipList = connect(mapStateToProps, {
  removeTip,
  readTip,
})(TipList)
export default connectedTipList
