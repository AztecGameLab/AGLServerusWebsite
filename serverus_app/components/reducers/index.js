import {combineReducers} from 'redux';
import accounts from './createAccountReducer';

const rootReducer = combineReducers({
    accounts:accounts //now we can refer to this as state.accounts
    //because of the way we named this property 
    //you can also use (shortname property name ES6)
});

export default rootReducer;