export default function setAdminReducer(state = false, action) {
    if (action.type == "IS_ADMIN") {
        state = action.access;
        return state;
    }
    else {
        return state;
    }
}
