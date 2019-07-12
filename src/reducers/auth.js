import * as types from '../constants/authActionTypes'

const authReducerInitialState = {}

const authReducer = (state = authReducerInitialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                uid: action.uid
            }
        case types.LOGOUT:
            return {}
        default:
            return state
    }
}

export default authReducer
