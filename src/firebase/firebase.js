import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export { firebase, database as default }
