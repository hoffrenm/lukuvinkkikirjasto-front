import React, { useEffect } from 'react'
import { Route /*, Switch */ } from 'react-router-dom'
import { connect } from 'react-redux'

import { initTips } from './reducers/tipReducer'

import AddTip from './components/AddTip'
import TipList from './components/TipList'

const App = (props) => {
  useEffect(() => {
    if (props.tips.processing) {
      props.initTips()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <h1 className="heading heading__h1">Lukuvinkkikirjasto</h1>
      <div className="content-container">
        <Route
          path="/"
          render={() => (
            <>
              <AddTip />
              <TipList />
            </>
          )}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    tips: state.tips,
  }
}

const connectedApp = connect(mapStateToProps, {
  initTips,
})(App)
export default connectedApp
