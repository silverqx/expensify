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
    startEditExpense,
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses,
} from '../../actions/expenses'
import expenses, { expensesWithIds } from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])
const uid = 'mytestinguid'
const initialMockStoreState = { auth: { uid } }

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

    test('should add expense to firebase and store', (done) => {
        const store = createMockStore(initialMockStoreState)

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

                return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
            })
            .then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData)
                done()
            })
    })

    test('should add expense with defaults to firebase and store', (done) => {
        const store = createMockStore(initialMockStoreState)

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

                return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
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
        beforeEach((done) => {
            const expensesData = {}
            expensesWithIds.forEach(({ id, description, note, amount, createdAt }) => {
                expensesData[id] = {
                    description,
                    note,
                    amount,
                    createdAt
                }
            })

            database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
        })

        test('should fetch the expenses from firebase', (done) => {
            const store = createMockStore(initialMockStoreState)

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

        test('should remove expense from firebase', (done) => {
            const store = createMockStore(initialMockStoreState)
            const id = expensesWithIds[1].id

            store.dispatch(startRemoveExpense(id)).then(() => {
                const actions = store.getActions()

                expect(actions[0]).toEqual({
                    type: types.REMOVE_EXPENSE,
                    id
                })

                return database.ref(`users/${uid}/expenses/${id}`).once('value')
            }).then((snapshot) => {
                expect(snapshot.val()).toBeFalsy()

                done()
            })
        })

        test('should update expense in firebase', (done) => {
            const store = createMockStore(initialMockStoreState)
            const id = expensesWithIds[2].id
            const updates = {
                description: 'Internet Bill Update',
                amount: 50.33
            }

            store.dispatch(startEditExpense(id, updates)).then(() => {
                const actions = store.getActions()

                expect(actions[0]).toEqual({
                    type: types.EDIT_EXPENSE,
                    id,
                    updates
                })

                return database.ref(`users/${uid}/expenses/${id}`).once('value')
            }).then((snapshot) => {
                expect(snapshot.val().description).toBe(updates.description)
                expect(snapshot.val().amount).toBe(updates.amount)

                done()
            })
        })
    })
})
