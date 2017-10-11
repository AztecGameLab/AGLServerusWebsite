export function giveAccess(access) {
    return {
        type: 'IS_ADMIN', 
        access
    };
}