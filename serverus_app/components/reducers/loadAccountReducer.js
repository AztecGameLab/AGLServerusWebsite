export default function loadAccountReducer(state = [], action) {
    switch(action.type) {
        case 'LOAD_ACCOUNT':
            debugger;
            //incorrect mutate of state
            //state.push(action.course);
            //return state;
            return[...state,
                Object.assign({}, action.account)
            ];
            //ES6 spread operator on existing state
            //Basically spreads the array and explodes it out here inline
            //Object.assign to create a deep copy of the new user passed in
            //together it makes brand new state
        case 'SIGN_OUT':
            debugger;
            return state = [];
        default:
            return state; 
    }
}
//default state is empty array courseReducer(state = [],