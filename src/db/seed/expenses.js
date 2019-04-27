import moment from 'moment'

const expensesSeed = [{
    description: 'Water Bill',
    note: 'Water Bill Note',
    amount: 166.60,
    createdAt: moment('2019-04-19').valueOf()
}, {
    description: 'Gas Bill',
    note: 'Gas Bill Note',
    amount: 5.20,
    createdAt: moment('2019-03-17').valueOf()
}, {
    description: 'Internet Bill',
    note: 'Internet Bill Note',
    amount: 50.20,
    createdAt: moment('2019-04-09').valueOf()
}, {
    description: 'Telekom Bill',
    note: 'Telekom Bill Note',
    amount: 10.20,
    createdAt: moment('2019-01-10').valueOf()
}]

export default expensesSeed
