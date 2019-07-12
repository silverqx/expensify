import authReducer from '../../reducers/auth'
import * as types from '../../constants/authActionTypes'

describe('auth reducers', () => {
    test('should set uid after login', () => {
        const uid = 'xyz123'
        const action = {
            type: types.LOGIN,
            uid
        }
        const state = authReducer({}, action)

        expect(state.uid).toBe(uid)
    })

    test('should clear uid ( whole state ) after logout', () => {
        const uid = 'xyz123'
        const action = {
            type: types.LOGOUT
        }
        const state = authReducer({ uid }, action)

        expect(state).toEqual({})
    })
})
