import tipService from '../services/tips';

export const initTips = () => {
    return async dispatch => {
        const tips = await tipService.getAll();
        dispatch({
            type: 'INIT_TIPS',
            data: tips
        });
    };
};

export const addTip = (e, tip) => {
    return async dispatch => {
        e.preventDefault();

        const result = await tipService.create(tip);
        const newTip = result;

        dispatch({
            type: 'ADD_TIP',
            data: newTip,
            name: 'add'
        });

        if ( result ) {
            dispatch({
                type: 'ACTION_SUCCESS',
                name: 'add',
                data: newTip
            });
        } else {
            dispatch({
                type: 'ACTION_FAIL',
                data: tip,
                name: 'add'
            });
        }
    };
};

const initialState = {
    tipdata: [],
    processing: true,
    error: null,
};

const tipReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'INIT_TIPS':
        return {
            ...state,
            processing: true,
            tipdata: action.data
        };
    case 'ADD_TIP':
        return {
            ...state,
            tipdata: [...state.tipdata, action.data],
            processing: true,
            newTitle: '',
            newUrl: ''
        };
    case 'ACTION_SUCCESS':
        return {
            ...state,
            [action.name]: false,
            processing: false,
            error: null,
        };
    case 'ACTION_FAIL':
        return {
            ...state,
            error: action.name,
            processing: false,
        };
    default: return state;
    }
};

export default tipReducer;