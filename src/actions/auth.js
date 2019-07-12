import { firebase, googleAuthProvider } from '../firebase/firebase'

import * as types from '../constants/authActionTypes'

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}

export const login = (uid) => ({
    type: types.LOGIN,
    uid
})

export const logout = () => ({
    type: types.LOGOUT
})
