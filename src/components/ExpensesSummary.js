import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import 'numeral/locales/sk'

import getExpensesTotal from '../selectors/expenses-total'
import getVisibleExpenses from '../selectors/expenses'

export const ExpensesSummary = ({ expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal).format('$0,0.00')

    return (
        <div>
            <div>
                <span>Showing {expensesCount} {expenseWord} </span>
                <span>with total amount {formattedExpensesTotal}</span>
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
