import React from 'react'
import { connect } from 'react-redux'

import ExpenseListItem from './ExpenseListItem'
import ExpenseListFilters from './ExpenseListFilters'

import getVisibleExpenses from '../selectors/expenses'

const ExpenseDashboardPage = ({ history, expenses }) => (
    <div>
        <h1>Expense Dashboard Page</h1>
        <h3>Expense List</h3>
        <ExpenseListFilters />
        {expenses.map((expense) => (
            <ExpenseListItem
                key={expense.id}
                {...expense}
                history={history}
            />
        ))}
    </div>
)

const mapStateToProps = ({ expenses, filters }) => ({
    expenses: getVisibleExpenses(expenses, filters)
})

export default connect(mapStateToProps)(ExpenseDashboardPage)
