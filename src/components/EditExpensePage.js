import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExpenseForm from './ExpenseForm'

import { editExpense } from '../actions/expenses'

export class EditExpensePage extends Component {
    onSubmit = (updatedExpense) => {
        this.props.editExpense(
            this.props.match.params.id,
            updatedExpense
        )
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

// FIXME really bad solution, should be done in router? And how to test this? silver
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

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, updatedExpense) => dispatch(
        editExpense(id, updatedExpense)
    )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExpensePage)
