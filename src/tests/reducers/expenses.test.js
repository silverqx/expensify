import expensesReducer from '../../reducers/expenses';
import * as types from '../../constants/expenseActionTypes'

describe('expense reducers', () => {
    test('should setup default expense values', () => {
        const action = expensesReducer(undefined, '@@INIT')

        expect(action).toEqual([])
    })

    // test('should set endDate filter', () => {
    //     const endDate = moment('2019-01-30')
    //     const action = filtersReducer(undefined, {
    //         type: types.SET_END_DATE,
    //         endDate
    //     })

    //     expect(action.endDate).toBe(endDate)
    // })
})
