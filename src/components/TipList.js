import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';
import Loading from './Loading';
import NoTips from './NoTips';

const TipList = props => {
    const {
        processing,
        tipdata
    } = props.tips;

    if (processing) {
        return <Loading />
    }

    if ( tipdata.length === 0 ) {
        return <NoTips />
    }

    console.log("TipList: tipdata", tipdata)

  return (
    <div>
      <h2>Lukuvinkit</h2>
      {tipdata.map(tip => {
        return (
          <div data-cy="tip-item" key={tip.id} className="tip-list-item">
            <div className="tip-content">
              {tip.title} - <a href={tip.url}>{tip.url}</a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    tips: state.tips
  }
}

const connectedTipList = connect(mapStateToProps)(TipList)
export default connectedTipList
