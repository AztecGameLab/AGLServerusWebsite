//Create Custom History Singleton
import createHistory from 'history/createBrowserHistory';
import {replace} from 'react-router-redux';

const history = createHistory();
export {history};


//History Redirect Actions
export const redirectToLobby = () => {
    return dispatch => {
        dispatch(replace('/lobby'));
    }
}

export const redirectToHome = () => {
    return dispatch => {
        dispatch(replace('/'));
    }
}
