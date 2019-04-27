import moment from 'moment'

import expensesSeed from '../../db/seed/expenses'
import getVisibleExpenses from '../../selectors/expenses'

describe('getVisibleExpenses selector', () => {
    test('should filter by text value', () => {
        const filters = {
            text: 'a',
            startDate: null,
            endDate: null,
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expensesSeed, filters)

        expect(visibleExpenses).toEqual([ expensesSeed[1], expensesSeed[0] ])
    })

    test('should filter by startDate value', () => {
        const filters = {
            text: '',
            startDate: moment('2019-04-09'),
            endDate: null,
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expensesSeed, filters)

        expect(visibleExpenses).toEqual([ expensesSeed[2], expensesSeed[0] ])
    })

    test('should filter by endDate value', () => {
        const filters = {
            text: '',
            startDate: null,
            endDate: moment('2019-04-08'),
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expensesSeed, filters)

        expect(visibleExpenses).toEqual([ expensesSeed[3], expensesSeed[1] ])
    })

    test('should sort by date', () => {
        const filters = {
            text: '',
            startDate: null,
            endDate: null,
            sortBy: 'date'
        }
        const visibleExpenses = getVisibleExpenses(expensesSeed, filters)

        expect(visibleExpenses).toEqual([
            expensesSeed[3],
            expensesSeed[1],
            expensesSeed[2],
            expensesSeed[0]
        ])
    })

    test('should sort by amount', () => {
        const filters = {
            text: '',
            startDate: null,
            endDate: null,
            sortBy: 'amount'
        }
        const visibleExpenses = getVisibleExpenses(expensesSeed, filters)

        expect(visibleExpenses).toEqual([
            expensesSeed[1],
            expensesSeed[3],
            expensesSeed[2],
            expensesSeed[0]
        ])
    })
})

