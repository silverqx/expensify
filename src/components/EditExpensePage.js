import React from 'react'
import { connect } from 'react-redux'

import ExpenseForm from './ExpenseForm'

import { editExpense } from '../actions/expenses'

const EditExpensePage = ({ dispatch, history, match, expense }) => (
    <div>
        <h1>Edit Expense</h1>
        <ExpenseForm
            expense={expense}
            onSubmit={updatedExpense => {
                dispatch(editExpense(match.params.id, updatedExpense))
                history.push('/')
            }}
        />
    </div>
)

// FIXME really bad solution, should be done in router? silver
const findExpense = (state, { history, match }) => {
    const expense = state.expenses.find(
        expense => expense.id === match.params.id
    )

    if (!expense)
        return history.goBack()

    return expense
}

const mapStateToProps = (state, props) => ({
    expense: findExpense(state, props)
})

export default connect(mapStateToProps)(EditExpensePage)
