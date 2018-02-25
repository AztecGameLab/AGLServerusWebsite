import {
    SIGN_IN_LOADING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT
} from './sessionConstants';

// Sign In Progress -> idle -> loading -> (loaded || failed)

const initialSessionState = {
    signedIn: false,
    signInProgress: "idle",
}

export default (state = initialSessionState, action) => {
    switch(action.type){
        case SIGN_IN_LOADING:
            return Object.assign({}, state, {signInProgress: "loading"})
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {signInProgress: "failed"})
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, action.payload.user, {signInProgress: "loaded"})
        case SIGN_OUT:
            return initialSessionState;
        default:
            return state;
    }
}