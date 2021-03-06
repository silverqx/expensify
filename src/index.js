import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ExpensifyApp, { history } from './components/App'
import LoadingPage from './components/LoadingPage'

import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
// import initialSeed from './utils/initialSeed'
import { firebase } from './firebase/firebase'

import './styles/main.scss'

const store = configureStore()

// This was used in early dev. stage
// initialSeed()

const App = () => (
    <Provider store={store}>
        <ExpensifyApp />
    </Provider>
)

let isRendered = false
const appRoot = document.getElementById('app')
const renderApp = () => {
    if (isRendered)
        return

    ReactDOM.render(<App />, appRoot)
    isRendered = true
}

ReactDOM.render(<LoadingPage />, appRoot)

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        store.dispatch(logout())
        renderApp()

        history.push('/')

        return
    }

    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses())
        .then(() => {
            renderApp()

            if (history.location.pathname === '/')
                history.push('/dashboard')
        })
})
