// Store/configureStore.js

import { createStore } from 'redux';
import Auth from './Reducers/AuthReducer';

export default createStore(Auth)
