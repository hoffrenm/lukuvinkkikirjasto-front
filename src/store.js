import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import tipReducer from './reducers/tipReducer'

const reducer = combineReducers({
  tips: tipReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

export default store
