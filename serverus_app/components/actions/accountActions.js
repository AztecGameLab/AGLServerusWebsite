export function loadAccount(account) {
    return {
        type: 'LOAD_ACCOUNT', 
        account
    };
}

export function signOutAccount() {
    return {
        type: 'SIGN_OUT'
    }
}