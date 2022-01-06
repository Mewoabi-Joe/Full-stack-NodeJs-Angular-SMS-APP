import { Action } from '@ngrx/store'
import { Auth } from './../models/auth.model'
import * as AuthActions from './../actions/auth.actions'

// Section 1
const initialState: Auth = {
    user: {
        id:"",
        first_name:""
    },
    token: ''
}

// Section 2
export function reducer(state: Auth = initialState, action: AuthActions.Actions) {

    // Section 3
    switch(action.type) {
        case AuthActions.ADD_AUTH:
            return action.payload;
        default:
            return state;
    }
}
