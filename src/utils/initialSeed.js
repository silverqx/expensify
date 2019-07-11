import { addExpense } from '../actions/expenses'
import { sortByAmount, setTextFilter } from '../actions/filters'
// import getVisibleExpenses from './selectors/expenses'

const initialSeed = () => {
// store.subscribe(() => {
//     const state = store.getState()

//     const visibleExpenses = getVisibleExpenses(
//         state.expenses,
//         state.filters
//     )
// })

    const expenseOne = store.dispatch(addExpense(expenses[0]))
    const expenseTwo = store.dispatch(addExpense(expenses[1]))
    const expenseThree = store.dispatch(addExpense(expenses[2]))
    const expenseFour = store.dispatch(addExpense(expenses[3]))

    // store.dispatch(setTextFilter('water'))
    store.dispatch(setTextFilter('bill'))
    store.dispatch(sortByAmount())

    // setTimeout(() => {
    //     store.dispatch(sortByAmount())
    //     store.dispatch(setTextFilter('bill'))
    // }, 1200)
}

export default initialSeed
