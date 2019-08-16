import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import 'numeral/locales/sk'

import getExpensesTotal from '../selectors/expenses-total'
import getVisibleExpenses from '../selectors/expenses'

export const ExpensesSummary = ({ expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal).format('$0,0.00')

    return (
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">
                    <span>Showing <strong>{expensesCount}</strong> {expenseWord} </span>
                    <span>with total amount <strong>{formattedExpensesTotal}</strong></span>
                </h2>
                <div className="page-header__actions">
                    <Link to="/create" className="button button-primary">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ expenses, filters }) => {
    const visibleExpenses = getVisibleExpenses(expenses, filters)

    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)
