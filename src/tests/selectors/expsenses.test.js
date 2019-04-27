import moment from 'moment'

import expenses from '../fixtures/expenses'
import getVisibleExpenses from '../../selectors/expenses'

describe('getVisibleExpenses selector', () => {
    test('should filter by text value', () => {
        const filters = {
            text: 'a',
            startDate: null,
            endDate: null,
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expenses, filters)

        expect(visibleExpenses).toEqual([ expenses[1], expenses[0] ])
    })

    test('should filter by startDate value', () => {
        const filters = {
            text: '',
            startDate: moment('2019-04-09'),
            endDate: null,
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expenses, filters)

        expect(visibleExpenses).toEqual([ expenses[2], expenses[0] ])
    })

    test('should filter by endDate value', () => {
        const filters = {
            text: '',
            startDate: null,
            endDate: moment('2019-04-08'),
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expenses, filters)

        expect(visibleExpenses).toEqual([ expenses[3], expenses[1] ])
    })

    test('should sort by date', () => {
        const filters = {
            text: '',
            startDate: null,
            endDate: null,
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expenses, filters)

        expect(visibleExpenses).toEqual([
            expenses[3],
            expenses[1],
            expenses[2],
            expenses[0]
        ])
    })

    test('should sort by amount', () => {
        const filters = {
            text: '',
            startDate: null,
            endDate: null,
            sortBy: 'amount'
        }
        const visibleExpenses = getVisibleExpenses(expenses, filters)

        expect(visibleExpenses).toEqual([
            expenses[1],
            expenses[3],
            expenses[2],
            expenses[0]
        ])
    })
})

