import moment from 'moment'

export const filters = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null
}

export const altFilters = {
    text: 'er',
    sortBy: 'amount',
    startDate: moment(0).add('3', 'days'),
    endDate: moment(0).add('5', 'days')
}
