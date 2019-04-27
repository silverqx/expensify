import uuid from 'uuid'

import * as types from '../constants/expenseActionTypes'

export const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: types.ADD_EXPENSE,
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

export const editExpense = (id, updates) => ({
    type: types.EDIT_EXPENSE,
    id,
    updates
})

export const removeExpense = (id) => ({
    type: types.REMOVE_EXPENSE,
    id
})
