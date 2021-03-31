import * as types from  '../../types'


export const loginSuccesAction = (token, account) => ({
    type: types.AUTH_SUCCES_ACTION,

    token: token,
    account: account

})

export const loginErrorAction = (error) => ({
    type: types.AUTH_FAILED_ACTION,
    error: error

})


export const loginRequeteAction = ( username, password, history) => ({
    type: types.AUTH_REQUETE_ACTION,
    username,
    password,
    history
})




export const loginSaveStateAction = ( state ) => ({
    type: types.AUTH_SAVE_STATE_ACTION,
    state
})

export const loginClearAction = (  ) => ({
    type: types.AUTH_CLEAR_STATE_ACTION,

})