import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login/loginReducer';
import user from './user/userReducer';

export default combineReducers({
    router: routerReducer,
    login,
    user,
});