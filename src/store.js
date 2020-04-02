import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import tipReducer from './reducers/tipReducer'

const reducer = combineReducers({
  tips: tipReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
