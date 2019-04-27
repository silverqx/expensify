import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import ExpensifyApp from './components/App'

import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { sortByAmount, setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import expensesSeed from './db/seed/expenses'

import 'normalize.css/normalize.css'
import './styles/main.scss'


const store = configureStore()

store.subscribe(() => {
    const state = store.getState()
	// console.log("TCL: state", state)

    const visibleExpenses = getVisibleExpenses(
        state.expenses,
        state.filters
    )
	// console.log("TCL: visibleExpenses", visibleExpenses)
})

const expenseOne = store.dispatch(addExpense(expensesSeed[0]))
const expenseTwo = store.dispatch(addExpense(expensesSeed[1]))
const expenseThree = store.dispatch(addExpense(expensesSeed[2]))
const expenseFour = store.dispatch(addExpense(expensesSeed[3]))

store.dispatch(setTextFilter('water'))
// store.dispatch(setTextFilter('bill'))
// store.dispatch(sortByAmount())

setTimeout(() => {
    store.dispatch(sortByAmount())
    store.dispatch(setTextFilter('bill'))
}, 1200)

const App = () => (
    <Provider store={store}>
        <ExpensifyApp />
    </Provider>
)

const appRoot = document.getElementById('app')
ReactDOM.render(<App />, appRoot)
