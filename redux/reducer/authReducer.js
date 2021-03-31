import * as types from  '../../types'


// State initiali pour l'authentification
export const initialState = {
    loading: false,
    token: '',
    isAuth: false,
    error: null,
    account: null
};

//Reducer authentification
 const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.AUTH_REQUETE_ACTION:
            return {
                ...state,
                loading: true
            }
        case types.AUTH_SUCCES_ACTION:

            return {
                    ...state,
                    loading: false,
                    token: action.token,
                    account: action.account,
                    isAuth: true
            }
        case types.AUTH_FAILED_ACTION:

            return {
                ...state,
                loading: false,
                error: action.error,
                isAuth: false
            }
        case types.AUTH_SAVE_STATE_ACTION:

            return { ...action.state}

        case types.AUTH_CLEAR_STATE_ACTION:

            return { ...initialState}

        default:
            return state; 
    }
}

export default authReducer ;