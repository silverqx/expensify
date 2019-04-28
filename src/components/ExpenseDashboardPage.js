import React from 'react'

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters'

const ExpenseDashboardPage = () => (
    <div>
        <h1>Expense Dashboard Page</h1>
        <h3>Expense List</h3>
        <ExpenseListFilters />
        <ExpenseList />
    </div>
)

export default ExpenseDashboardPage
