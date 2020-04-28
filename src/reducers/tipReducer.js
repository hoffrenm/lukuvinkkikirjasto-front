import tipService from '../services/tips'

const formatTip = (tip) => ({
  ...tip,
  createdAt: new Date(tip.createdAt),
  readAt: tip.read ? new Date(tip.readAt) : null,
})

export const initTips = () => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_GET_TIPS',
    })

    const result = await tipService.getAll()

    if (result.status === 200) {
      const formattedTips = result.data.map(formatTip)

      dispatch({
        type: 'GET_TIPS_SUCCESS',
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

export const searchUnreadedTips = (termData) => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_SEARCH_TIPS',
    })

    try {
      let result

      if (termData.unreadedTips) {
        result = await tipService.getAllUnread()
      } else {
        result = await tipService.getAll()
      }

      dispatch({
        type: 'SEARCH_TIPS_SUCCESS',
        data: result.data.map(formatTip),
      })
    } catch (error) {
      dispatch({
        type: 'ACTION_FAIL',
        data: error.response.data.error,
      })
    }
  }
}

export const searchByTerms = (termData) => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_SEARCH_TIPS',
    })

    let result
    if (termData.title.length === 0) {
      result = await tipService.getAll()
    } else {
      result = await tipService.getByTitle(termData.title)
    }

    if (result.status === 200) {
      const formattedTips = result.data.map(formatTip)

      dispatch({
        type: 'SEARCH_TIPS_SUCCESS',
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

export const searchByTag = (termData) => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_SEARCH_TIPS',
    })

    let result

    try {
      if (termData.tag.length === 0) {
        result = await tipService.getAll()
      } else {
        result = await tipService.getByTag(termData.tag)
      }
    } catch (error) {
      result = error
    }

    if (result.status === 200) {
      const formattedTips = result.data.map(formatTip)

      dispatch({
        type: 'SEARCH_TIPS_SUCCESS',
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


export const removeSearchFilter = () => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_GET_TIPS',
    })

    const result = await tipService.getAll()
    if (result.status === 200) {
      const formattedTips = result.data.map(formatTip)

      dispatch({
        type: 'REMOVE_SEARCH_FILTER_SUCCESS',
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
      type: 'INIT_ADD_TIP',
    })

    try {
      const result = await tipService.create(tip)

      dispatch({
        type: 'ADD_TIP_SUCCESS',
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
      type: 'INIT_REMOVE_TIP',
    })

    let result
    try {
      result = await tipService.remove(id)
    } catch (error) {
      result = error
    }

    if (result.status === 204) {
      dispatch({
        type: 'REMOVE_TIP_SUCCESS',
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

export const updateTip = (id, tip) => {
  return async (dispatch) => {
    try {
      const result = await tipService.update(id, tip)

      dispatch({
        type: 'UPDATE_TIP',
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
      type: 'INIT_READ_TIP',
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

const initialState = {
  tipdata: [],
  processing: true,
  error: null,
  isSearchActive: false,
}

const tipReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_GET_TIPS':
      return {
        ...state,
        processing: true,
      }
    case 'GET_TIPS_SUCCESS':
      return {
        ...state,
        tipdata: state.tipdata.concat(action.data),
        processing: false,
        error: null,
      }
    case 'INIT_ADD_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'ADD_TIP_SUCCESS':
      return {
        ...state,
        tipdata: state.tipdata.concat(action.data),
        processing: false,
        error: null,
      }
    case 'INIT_REMOVE_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'REMOVE_TIP_SUCCESS':
      return {
        ...state,
        tipdata: state.tipdata.filter((tip) => tip.id !== action.data),
        processing: false,
        error: null,
      }
    case 'INIT_SEARCH_TIPS':
      return {
        ...state,
        processing: true,
        isSearchActive: true,
      }
    case 'SEARCH_TIPS_SUCCESS':
      return {
        ...state,
        tipdata: action.data,
        processing: false,
        error: null,
      }
    case 'REMOVE_SEARCH_FILTER_SUCCESS':
      return {
        ...state,
        tipdata: action.data,
        processing: false,
        error: null,
        isSearchActive: false,
      }
    case 'INIT_READ_TIP':
      return {
        ...state,
        processing: true,
      }
    case 'READ_SUCCESS': {
      const readTip = action.data
      return {
        ...state,
        tipdata: state.tipdata.map((tip) =>
          tip.id === readTip.id ? readTip : tip
        ),
        processing: false,
        error: null,
      }
    }
    case 'UPDATE_TIP': {
      const updatedTip = action.data
      return {
        ...state,
        tipdata: state.tipdata.map((tip) =>
          tip.id !== updatedTip.id ? tip : updatedTip
        ),
      }
    }
    case 'ACTION_FAIL':
      window.alert(`Toiminto epäonnistui (${action.data})`)
      return {
        ...state,
        error: action.data,
        processing: false,
      }
    default:
      return state
  }
}

export default tipReducer
