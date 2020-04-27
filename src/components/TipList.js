import React from 'react'
import { connect } from 'react-redux'
import { removeTip, readTip } from '../reducers/tipReducer'
import Tip from './Tip'
import Loading from './Loading'
import NoTips from './NoTips'


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
            <Tip key={tip.id} tip={tip} deleteTip={deleteTip} readTip={readTip} />
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
