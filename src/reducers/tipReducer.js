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
    
    if (result.status === 201) {
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

export const removeTip = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_TIP'
    })

    const result = await tipService.remove(id)

    // const result = 200
    // if (result === 200) {

    if (result.status === 200) {
      dispatch({
        type: 'REMOVE_SUCCESS',
        data: id
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
        tipdata: state.tipdata.concat(action.data),
        processing: false,
        error: null
      }
    case 'ACTION_FAIL':
      window.alert(`Toiminto epäonnistui (${action.data})`)
      return {
        ...state,
        error: action.data,
        processing: false
      }
    case 'REMOVE_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'REMOVE_SUCCESS':
      return {
        ...state,
        tipdata: state.tipdata.filter(tip => tip.id !== action.data),
        processing: false,
        error: null
      }
    default:
      return state
  }
}

export default tipReducer