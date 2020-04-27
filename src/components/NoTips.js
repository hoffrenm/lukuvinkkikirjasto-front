import React from 'react'
import { connect } from 'react-redux'

const NoTips = (props) => {
  if (props.isSearchActive) {
    return (
      <div>
        <p>Ei hakutuloksia :(</p>
      </div>
    )
  }

  return (
    <div>
      <p>Et ole lisännyt vinkkejä vielä</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isSearchActive: state.tips.isSearchActive
  }
}

const connectedNoTips = connect(mapStateToProps, {})(NoTips)
export default connectedNoTips