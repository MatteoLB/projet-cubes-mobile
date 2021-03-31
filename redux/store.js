import { combineReducers, createStore } from 'redux';
import authReducer from './reducer/authReducer'

export default createStore(combineReducers({
    auth: authReducer
}))


