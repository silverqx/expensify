import { login, logout } from '../../actions/auth'
import * as types from '../../constants/authActionTypes'

describe('auth action creators', () => {
    test('should setup login action creator', () => {
        const uid = 'abc123'
        const action = login(uid)

        expect(action).toEqual({
            type: types.LOGIN,
            uid
        })
    })

    test('should setup login action creator', () => {
        const action = logout()

        expect(action).toEqual({
            type: types.LOGOUT
        })
    })
})
