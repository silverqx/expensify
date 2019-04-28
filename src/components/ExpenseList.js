import React from 'react'
import { connect } from 'react-redux'

import ExpenseListItem from './ExpenseListItem'

import getVisibleExpenses from '../selectors/expenses'

export const ExpenseList = ({ history, expenses }) => (
    <div>
        {
            expenses.length === 0 ?
                <p>No Expenses</p> :
                expenses.map((expense) => (
                    <ExpenseListItem
                        key={expense.id}
                        {...expense}
                    />
                ))
        }
    </div>
)

const mapStateToProps = ({ expenses, filters }) => ({
    expenses: getVisibleExpenses(expenses, filters)
})

export default connect(mapStateToProps)(ExpenseList)
