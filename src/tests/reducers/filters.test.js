import moment from 'moment'

import filtersReducer from '../../reducers/filters'
import * as types from '../../constants/filterActionTypes'

describe('filter reducers', () => {
    test('should setup default filter values', () => {
        const action = filtersReducer(undefined, '@@INIT')

        expect(action).toEqual({
            text: '',
            sortBy: 'date',
            startDate: null,
            endDate: null
        })
    })

    test('should set sortBy date', () => {
        const state = {
            text: '',
            sortBy: 'amount',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        }
        const action = filtersReducer(state, { type: types.SORT_BY_DATE })

        expect(action).toEqual({
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        })
    })

    test('should set sortBy amount', () => {
        const action = filtersReducer(undefined, { type: types.SORT_BY_AMOUNT })

        expect(action.sortBy).toBe('amount')
    })

    test('should set text filter', () => {
        const text = 'water'
        const action = filtersReducer(undefined, {
            type: types.SET_TEXT_FILTER,
            text
        })

        expect(action.text).toBe(text)
    })

    test('should set startDate filter', () => {
        const startDate = moment('2019-01-20')
        const action = filtersReducer(undefined, {
            type: types.SET_START_DATE,
            startDate
        })

        expect(action.startDate).toEqual(startDate)
    })

    test('should set endDate filter', () => {
        const endDate = moment('2019-01-30')
        const action = filtersReducer(undefined, {
            type: types.SET_END_DATE,
            endDate
        })

        expect(action.endDate).toEqual(endDate)
    })
})
