import moment from 'moment'
import uuid from 'uuid'

import * as types from '../../constants/expenseActionTypes'
import {
    addExpense,
    editExpense,
    removeExpense
} from '../../actions/expenses'

describe('expense action creators', () => {
    test('should setup addExpense action creator', () => {
        const createdAt = moment().valueOf()
        const expenseDate = {
            description: 'Water Bill',
            note: 'Water Bill Note',
            amount: 25.55,
            createdAt
        }
        const action = addExpense(expenseDate)

        expect(action).toEqual({
            type: types.ADD_EXPENSE,
            expense: {
                ...expenseDate,
                id: expect.any(String)
            }
        })
    })

    test('should setup addExpense action creator with default values', () => {
        const action = addExpense()

        expect(action).toEqual({
            type: types.ADD_EXPENSE,
            expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createdAt: 0
            }
        })
    })

    test('should setup editExpense action creator for all properties', () => {
        const id = uuid()
        const createdAt = moment().valueOf()
        const expenseData = {
            description: 'Gas Bill',
            note: 'Gas Bill Note',
            amount: 21.35,
            createdAt
        }
        const action = editExpense(id, expenseData)

        expect(action).toEqual({
            type: types.EDIT_EXPENSE,
            id,
            updates: expenseData
        })
    })

    test('should setup editExpense action creator for some properties', () => {
        const id = uuid()
        const createdAt = moment().valueOf()
        const expenseData = {
            description: 'Gas Bill',
            createdAt
        }
        const action = editExpense(id, expenseData)

        expect(action).toEqual({
            type: types.EDIT_EXPENSE,
            id,
            updates: expenseData
        })
    })

    test('should setup removeExpense action creator', () => {
        const id = uuid()
        const action = removeExpense(id)

        expect(action).toEqual({
            type: types.REMOVE_EXPENSE,
            id
        })
    })
})
