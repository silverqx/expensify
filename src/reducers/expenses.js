import * as types from '../constants/expenseActionTypes'

const expensesReducerInitialState = []

const expensesReducer = (state = expensesReducerInitialState, action) => {
    switch (action.type) {
        case types.ADD_EXPENSE:
            return [
                ...state,
                action.expense
            ]
        case types.EDIT_EXPENSE:
            return state.map((expense) => {
                if (expense.id !== action.id)
                    return expense

                return {
                    ...expense,
                    ...action.updates
                }
            })
        case types.REMOVE_EXPENSE:
            return state.filter((expense) => expense.id !== action.id)
        case types.SET_EXPENSES:
            return action.expenses
        default:
            return state
    }
}

export default expensesReducer
