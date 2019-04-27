import moment from 'moment'

import * as types from '../../constants/filterActionTypes'
import {
    setTextFilter,
    setStartDate,
    setEndDate,
    sortByDate,
    sortByAmount
} from '../../actions/filters'

describe('filter action creators', () => {
    test('should setup setTextFilter action creator', () => {
        const text = 'Water Bill'

        expect(setTextFilter(text)).toEqual({
            type: types.SET_TEXT_FILTER,
            text
        })
    })

    test('should setup setTextFilter action creator with empty value', () => {
        expect(setTextFilter()).toEqual({
            type: types.SET_TEXT_FILTER,
            text: ''
        })
    })

    test('should setup setStartDate action creator', () => {
        const startDate = moment('2019-01-20')

        expect(setStartDate(startDate)).toEqual({
            type: types.SET_START_DATE,
            startDate
        })
    })

    test('should setup setEndDate action creator', () => {
        const endDate = moment('2019-03-20')

        expect(setEndDate(endDate)).toEqual({
            type: types.SET_END_DATE,
            endDate
        })
    })

    test('should setup setStartDate action creator with empty value', () => {
        expect(setStartDate()).toEqual({
            type: types.SET_START_DATE,
            startDate: null
        })
    })

    test('should setup setEndDate action creator with empty value', () => {
        expect(setEndDate()).toEqual({
            type: types.SET_END_DATE,
            endDate: null
        })
    })

    test('should setup sortByDate action creator', () => {
        expect(sortByDate()).toEqual({ type: types.SORT_BY_DATE })
    })

    test('should setup sortByAmount action creator', () => {
        expect(sortByAmount()).toEqual({ type: types.SORT_BY_AMOUNT })
    })
})
