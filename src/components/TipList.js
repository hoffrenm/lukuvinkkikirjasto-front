import React from 'react'
import { connect } from 'react-redux'
import { removeTip } from '../reducers/tipReducer'
import Loading from './Loading'
import NoTips from './NoTips'

const TipList = (props) => {
  const { processing, tipdata } = props.tips

  if (processing) {
    return <Loading />
  }

  if (tipdata.length === 0) {
    return <NoTips />
  }

  console.log('TipList: tipdata', tipdata)

  const byReverseId = (b, a) => a.id - b.id

  const deleteTip = async (tip) => {
    const ok = window.confirm(`Poistetaanko lukuvinkki '${tip.title}'?`)
    if (ok)
      props.removeTip(tip.id)
  }

  return (
    <div>
      <h2>Lukuvinkit</h2>
      {tipdata.sort(byReverseId).map((tip) => {
        return (
          <div data-cy="tip-item" key={tip.id} className="tip-list-item">
            <div className="tip-content">
              {tip.title} - <a href={tip.url}>{tip.url}</a> <button onClick={() => deleteTip(tip)}>Poista</button>
            </div>
          </div>
        )
      })}
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
})(TipList)
export default connectedTipList
