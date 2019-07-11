import moment from 'moment'
import uuid from 'uuid'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

import * as types from '../../constants/expenseActionTypes'
import {
    addExpense,
    startAddExpense,
    editExpense,
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses,
} from '../../actions/expenses'
import expenses, { expensesWithIds } from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

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
                ...expenseDate
            }
        })
    })

    test('should add expense to database and store', (done) => {
        const store = createMockStore({})

        const createdAt = moment().valueOf()
        const expenseData = {
            description: 'New Mouse',
            note: 'New Mouse Note',
            amount: 49.95,
            createdAt
        }

        store.dispatch(startAddExpense(expenseData))
            .then(() => {
                const actions = store.getActions()
                expect(actions[0]).toEqual({
                    type: types.ADD_EXPENSE,
                    expense: {
                        id: expect.any(String),
                        ...expenseData
                    }
                })

                return database.ref(`expenses/${actions[0].expense.id}`).once('value')
            })
            .then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData)
                done()
            })
    })

    test('should add expense with defaults to firebase and store', (done) => {
        const store = createMockStore({})

        const expenseData = {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }

        store.dispatch(startAddExpense())
            .then(() => {
                const actions = store.getActions()
                expect(actions[0]).toEqual({
                    type: types.ADD_EXPENSE,
                    expense: {
                        id: expect.any(String),
                        ...expenseData
                    }
                })

                return database.ref(`expenses/${actions[0].expense.id}`).once('value')
            })
            .then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData)
                done()
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

    test('should setup setExpenses action creator', () => {
        const action = setExpenses(expenses)

        expect(action).toEqual({
            type: types.SET_EXPENSES,
            expenses
        })
    })

    describe('tests with preloaded expenses', () => {
        beforeAll((done) => {
            const expensesData = {}
            expensesWithIds.forEach(({ id, description, note, amount, createdAt }) => {
                expensesData[id] = {
                    description,
                    note,
                    amount,
                    createdAt
                }
            })

            database.ref('expenses').set(expensesData).then(() => done())
        })

        test('should fetch the expenses from firebase', (done) => {
            const store = createMockStore({})

            store.dispatch(startSetExpenses())
                .then(() => {
                    const actions = store.getActions()

                    expect(actions[0]).toEqual({
                        type: types.SET_EXPENSES,
                        expenses: expensesWithIds
                    })
                    done()
                })
        })
    })

    test('should setup startRemoveExpense action creator', (done) => {
        const store = createMockStore({})
        const id = expensesWithIds[1].id

        store.dispatch(startRemoveExpense(id)).then(() => {
            const actions = store.getActions()

            expect(actions[0]).toEqual({
                type: types.REMOVE_EXPENSE,
                id
            })

            return database.ref(`expenses/${id}`).once('value')
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy()

            done()
        })
    })
})
