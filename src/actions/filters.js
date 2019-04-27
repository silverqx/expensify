import * as types from '../constants/filterActionTypes'

export const setTextFilter = (text = '') => ({
    type: types.SET_TEXT_FILTER,
    text
})

export const setStartDate = (startDate = null) => ({
    type: types.SET_START_DATE,
    startDate
})

export const setEndDate = (endDate = null) => ({
    type: types.SET_END_DATE,
    endDate
})

export const sortByDate = () => ({
    type: types.SORT_BY_DATE
})

export const sortByAmount = () => ({
    type: types.SORT_BY_AMOUNT
})
