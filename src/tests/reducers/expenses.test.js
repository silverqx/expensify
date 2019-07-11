import { expensesWithIds as expenses } from '../fixtures/expenses'
import expensesReducer from '../../reducers/expenses'
import * as types from '../../constants/expenseActionTypes'

describe('expense reducers', () => {
    test('should setup default expense values', () => {
        const state = expensesReducer(undefined, '@@INIT')

        expect(state).toEqual([])
    })

    test('should remove expense by id', () => {
        const id = expenses[1].id
        const state = expensesReducer(expenses, {
            type: types.REMOVE_EXPENSE,
            id
        })

        expect(state).toEqual([
            expenses[0],
            expenses[2],
            expenses[3]
        ])
    })

    test('should not remove an expense if id not found', () => {
        const id = '0'
        const state = expensesReducer(expenses, {
            type: types.REMOVE_EXPENSE,
            id
        })

        expect(state).toEqual(expenses)
    })

    test('should add an expense', () => {
        const initialState = []
        const state = expensesReducer(initialState, {
            type: types.ADD_EXPENSE,
            expense: expenses[0]
        })

        expect(state).toEqual([ expenses[0] ])

        // another expense
        const expense = {
            id: '10',
            description: 'Food Bill',
            note: 'Foot Bill Note',
            amount: 30.55,
            createdAt: 1000
        }
        const state1 = expensesReducer(state, {
            type: types.ADD_EXPENSE,
            expense
        })

        expect(state1).toEqual([
            expenses[0],
            expense
        ])
    })

    test('should edit an expense', () => {
        const testedExpense = {
            id: '10',
            description: 'Food Bill',
            note: 'Foot Bill Note',
            amount: 30.55,
            createdAt: 1000
        }
        const initialState = [
            expenses[0],
            testedExpense
        ]
        const updates = {
            note: 'Updated Note',
            amount: 10.30
        }
        const state = expensesReducer(initialState, {
            type: types.EDIT_EXPENSE,
            id: testedExpense.id,
            updates
        })

        expect(state).toEqual([
            expenses[0],
            {
                ...testedExpense,
                ...updates
            }
        ])
    })

    test('should not edit an expense if expense id not found', () => {
        const updates = {
            note: 'Updated Note',
            amount: 10.30
        }
        const state = expensesReducer(expenses, {
            type: types.EDIT_EXPENSE,
            id: '0',
            updates
        })

        expect(state).toEqual(expenses)
    })

    test('should set expenses', () => {
        const action = {
            type: types.SET_EXPENSES,
            expenses: [ expenses[1] ]
        }
        const state = expensesReducer(expenses, action)

        expect(state).toEqual([ expenses[1] ])
    })
})
