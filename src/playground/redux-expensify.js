import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({
    description,
    note,
    amount,
    createdAt
}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// REMOVE_EXPENSE
const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// SET_START_DATE
const setStartDate = (startDate = null) => ({
    type: 'SET_START_DATE',
    startDate
})

// SET_END_DATE
const setEndDate = (endDate = null) => ({
    type: 'SET_END_DATE',
    endDate
})

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// Expenses Reducer
const expensesReducerInitialState = []
const expensesReducer = (state = expensesReducerInitialState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id !== action.id)
                    return expense

                return {
                    ...expense,
                    ...action.updates
                }
            })
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id)
        default:
            return state
    }
}

// Filters Reducer
const filtersReducerInitialState = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null
}
const filtersReducer = (state = filtersReducerInitialState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        default:
            return state
    }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        const startDateMatch = startDate === null || expense.createdAt >= startDate
        const endDateMatch = endDate === null || expense.createdAt <= endDate

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        const sortByMap = {
            date: 'createdAt',
            amount: 'amount'
        }
        const sortColumn = sortByMap[sortBy]

        if (a[sortColumn] < b[sortColumn])
            return -1
        if (a[sortColumn] > b[sortColumn])
            return 1

        return 0
    })
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()

    // console.log(state)

    const visibleExpenses = getVisibleExpenses(
        state.expenses,
        state.filters
    )
    console.log(visibleExpenses)
})

// Expenses
const expenseOne = store.dispatch(addExpense({
    description: 'Rent',
    note: 'rent description',
    amount: 166.60,
    createdAt: 300
}))
const expenseTwo = store.dispatch(addExpense({
    description: 'Coffee',
    note: 'coffee description',
    amount: 5.20,
    createdAt: 600
}))

store.dispatch(editExpense(expenseOne.expense.id, {
    amount: 266.6
}))
store.dispatch(editExpense(expenseTwo.expense.id, {
    description: 'coffee late'
}))

// store.dispatch(removeExpense(expenseTwo.expense.id))

// Filters
// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter(''))
// store.dispatch(setTextFilter())

// store.dispatch(setStartDate(-100))
// store.dispatch(setEndDate(600))
// store.dispatch(setStartDate())

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// Only as Example state object
const demoState = {
    expenses: [{
        id: 'poijasdfhwer',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}
