import moment from 'moment'

import * as types from '../constants/filterActionTypes'

const filtersReducerInitialState = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null
}

const filtersReducer = (state = filtersReducerInitialState, action) => {
    switch (action.type) {
        case types.SET_TEXT_FILTER:
            return {
                ...state,
                text: action.text
            }
        case types.SET_START_DATE:
            return {
                ...state,
                startDate: action.startDate
            }
        case types.SET_END_DATE:
            return {
                ...state,
                endDate: action.endDate
            }
        case types.SORT_BY_DATE:
            return {
                ...state,
                sortBy: 'date'
            }
        case types.SORT_BY_AMOUNT:
            return {
                ...state,
                sortBy: 'amount'
            }
        default:
            return state
    }
}

export default filtersReducer
