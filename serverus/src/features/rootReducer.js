import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session/sessionReducer';

export default combineReducers({
    router: routerReducer,
    session
});