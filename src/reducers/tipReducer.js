import tipService from '../services/tips'

const formatTip = (tip) => ({
  ...tip,
  createdAt: new Date(tip.createdAt),
  readAt: tip.read ? new Date(tip.readAt) : null,
})

export const initTips = () => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_TIPS',
    })

    const result = await tipService.getAll()

    if (result.status === 200) {
      const formattedTips = result.data.map(formatTip)

      dispatch({
        type: 'ACTION_SUCCESS',
        data: formattedTips,
      })
    } else {
      dispatch({
        type: 'ACTION_FAIL',
        data: result,
      })
    }
  }
}

export const addTip = (tip) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_TIP',
    })

    try {
      const result = await tipService.create(tip)

      dispatch({
        type: 'ACTION_SUCCESS',
        data: formatTip(result.data),
      })
    } catch (error) {
      dispatch({
        type: 'ACTION_FAIL',
        data: error.response.data.error,
      })
    }
  }
}

export const readTip = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'READ_TIP',
    })

    try {
      const result = await tipService.read(id)

      dispatch({
        type: 'READ_SUCCESS',
        data: formatTip(result.data),
      })
    } catch (error) {
      dispatch({
        type: 'ACTION_FAIL',
        data: error.response.data.error,
      })
    }
  }
}

export const removeTip = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_TIP',
    })

    let result
    try {
      result = await tipService.remove(id)
    } catch (error) {
      result = error
    }

    if (result.status === 204) {
      dispatch({
        type: 'REMOVE_SUCCESS',
        data: id,
      })
    } else {
      dispatch({
        type: 'ACTION_FAIL',
        data: result,
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
        processing: true,
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
        error: null,
      }
    case 'ACTION_FAIL':
      window.alert(`Toiminto epäonnistui (${action.data})`)
      return {
        ...state,
        error: action.data,
        processing: false,
      }
    case 'REMOVE_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'REMOVE_SUCCESS':
      return {
        ...state,
        tipdata: state.tipdata.filter((tip) => tip.id !== action.data),
        processing: false,
        error: null,
      }
    case 'READ_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'READ_SUCCESS': {
      const readTip = action.data
      return {
        ...state,
        tipdata: state.tipdata.map((tip) => tip.id === readTip.id ? readTip : tip),
        processing: false,
        error: null,
      }
    }
    default:
      return state
  }
}

export default tipReducer
