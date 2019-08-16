import React from 'react'
import { connect } from 'react-redux'

import ExpenseListItem from './ExpenseListItem'

import getVisibleExpenses from '../selectors/expenses'

export const ExpenseList = ({ history, expenses }) => (
    <div className="content-container">
        <div className="list">
            <div className="list__header">
                <div className="show-on-desktop">Expense</div>
                <div className="show-on-desktop">Amount</div>
                <div className="show-on-mobile">Expenses</div>
            </div>

            <div className="list__content">
                {
                    expenses.length === 0 ?
                        <div className="list__content--empty">No Expenses</div> :
                        expenses.map((expense) => (
                            <ExpenseListItem
                                key={expense.id}
                                {...expense}
                            />
                        ))
                }
            </div>
        </div>
    </div>
)

const mapStateToProps = ({ expenses, filters }) => ({
    expenses: getVisibleExpenses(expenses, filters)
})

export default connect(mapStateToProps)(ExpenseList)
