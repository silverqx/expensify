import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ExpensifyApp from './components/App'

import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
// import initialSeed from './utils/initialSeed'
import './firebase/firebase'

import 'normalize.css/normalize.css'
import './styles/main.scss'

const store = configureStore()

// This was used in early dev. stage
// initialSeed()

const App = () => (
    <Provider store={store}>
        <ExpensifyApp />
    </Provider>
)

const appRoot = document.getElementById('app')

ReactDOM.render(<p>Loading...</p>, appRoot)

store.dispatch(startSetExpenses())
    .then(() => {
        ReactDOM.render(<App />, appRoot)
    })
