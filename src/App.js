import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'

import { initTips } from './reducers/tipReducer'

import EditTip from './components/EditTip'
import AddTip from './components/AddTip'
import TipList from './components/TipList'
import SearchForm from './components/SearchForm'

const App = (props) => {
  useEffect(() => {
    if (props.tips.processing) {
      props.initTips()
    }
    // eslint-disable-next-line
  }, [])

  const matchTip = useRouteMatch('/tips/:id/edit')
  const matchingTip = matchTip
    ? props.tips.tipdata.find((tip) => tip.id === Number(matchTip.params.id))
    : null

  return (
    <div className="App">
      <h1 className="heading heading__h1">Lukuvinkkikirjasto</h1>
      <div className="content-container">
        <Switch>
          <Route path="/tips/:id/edit">
            <EditTip tip={matchingTip} />
          </Route>
          <Route
            path="/"
            render={() => (
              <>
                <AddTip />
                <SearchForm />
                <TipList />
              </>
            )}
          />
        </Switch>
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
