import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExpenseForm from './ExpenseForm'

import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import findExpense from '../selectors/findExpense'

export class EditExpensePage extends Component {
    onSubmit = (updatedExpense) => {
        this.props.startEditExpense(
            this.props.expense.id,
            updatedExpense
        )
        this.props.history.push('/')
    }

    onRemove = () => {
        this.props.startRemoveExpense(
            this.props.expense.id
        )
        this.props.history.push('/')
    }

    onCancel = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                        onRemove={this.onRemove}
                        onCancel={this.onCancel}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    expense: findExpense(state, props)
})

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, updatedExpense) => dispatch(
        startEditExpense(id, updatedExpense)
    ),
    startRemoveExpense: id => dispatch(startRemoveExpense(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExpensePage)
