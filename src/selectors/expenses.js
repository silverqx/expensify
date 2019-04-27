import moment from 'moment'

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        const createdAt = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAt, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAt, 'day') : true

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        const sortByMap = {
            date: 'createdAt',
            amount: 'amount'
        }
        const sortColumn = sortByMap[sortBy]

        if (a[sortColumn] < b[sortColumn])
            return -1
        if (a[sortColumn] > b[sortColumn])
            return 1

        return 0
    })
}

export default getVisibleExpenses
