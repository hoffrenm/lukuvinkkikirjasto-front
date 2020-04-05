import tipService from '../services/tips'

export const initTips = () => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_TIPS',
    })

    const result = await tipService.getAll()

    if (result.status === 200) {
      dispatch({
        type: 'ACTION_SUCCESS',
        data: result.data,
      })
    } else {
      dispatch({
        type: 'ACTION_FAIL',
        data: result,
      })
    }
  }
}

export const addTip = (e, tip) => {
  return async (dispatch) => {
    e.preventDefault()

    dispatch({
      type: 'ADD_TIP'
    })

    const result = await tipService.create(tip)

    if (result.status === 200) {
      dispatch({
        type: 'ACTION_SUCCESS',
        data: result.data
      })
    } else {
      dispatch({
        type: 'ACTION_FAIL',
        data: result
      })
    }
  }
}

const initialState = {
  tipdata: [],
  processing: true,
  error: null,
}

const tipReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TIPS':
      return {
        ...state,
        processing: true
      }
    case 'ADD_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'ACTION_SUCCESS':
      return {
        ...state,
        tipdata: state.tipdata = state.tipdata.concat(action.data),
        processing: false,
        error: null
      }
    case 'ACTION_FAIL':
      return {
        ...state,
        error: action.data,
        processing: false
      }
    default:
      return state
  }
}

export default tipReducer
