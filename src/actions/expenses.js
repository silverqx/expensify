import database from '../firebase/firebase'
import * as types from '../constants/expenseActionTypes'

export const addExpense = (expense) => ({
    type: types.ADD_EXPENSE,
    expense
})

export const startAddExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const expense = {
            description,
            note,
            amount,
            createdAt
        }

        return database.ref(`users/${uid}/expenses`).push(expense).then((snapshot) => {
            dispatch(addExpense({
                id: snapshot.key,
                ...expense
            }))
        })
    }
}

export const editExpense = (id, updates) => ({
    type: types.EDIT_EXPENSE,
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/expenses/${id}`).update(updates)
            .then(() => {
                dispatch(editExpense(id, updates))
            })
    }
}

export const removeExpense = (id) => ({
    type: types.REMOVE_EXPENSE,
    id
})

export const startRemoveExpense = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/expenses/${id}`).remove()
            .then(() => {
                dispatch(removeExpense(id))
            })
    }
}

export const setExpenses = (expenses) => ({
    type: types.SET_EXPENSES,
    expenses
})

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/expenses`).once('value')
            .then((snapshot) => {
                const expenses = []

                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                })

                dispatch(setExpenses(expenses))
            })
    }
}
