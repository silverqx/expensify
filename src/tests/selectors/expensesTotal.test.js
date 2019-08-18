import getExpensesTotal from '../../selectors/expensesTotal'
import expenses from '../fixtures/expenses'

describe('getExpensesTotal selector', () => {
    test('should return 0 if no expenses', () => {
        const result = getExpensesTotal([])

        expect(result).toBe(0)
    })

    test('should correctly add up a single expense', () => {
        const result = getExpensesTotal([ expenses[0] ])

        expect(result).toBe(166.6)
    })

    test('should correctly add up multiple expenses', () => {
        const result = getExpensesTotal(expenses)

        expect(result).toBe(232.2)
    })
})
