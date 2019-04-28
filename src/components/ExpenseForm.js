import React, { Component } from 'react'

import moment from 'moment'
// TODO check this along with import 'react-dates/lib/css/_datepicker.css' in App.js silver
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import debounce from 'lodash.debounce'

import FormErrors from './FormErrors'

export default class ExpenseForm extends Component {
    constructor(props) {
        super(props)

        const expense = props.expense || {}

        this.state = {
            expense: {
                description: expense.description || '',
                amount: expense.amount ? expense.amount + '' : '',
                createdAt: expense.createdAt ? moment(expense.createdAt) : moment(),
                note: expense.note || ''
            },
            datepickerFocused: false,
            errors: []
        }
    }

    componentWillUnmount() {
        this.validateFormDebounced.cancel()
    }

    onDescriptionChange = (e) => {
        const description = e.target.value

        this.setState((prevState) => ({
            expense: {
                ...prevState.expense,
                description
            }
        }))

        this.validateFormDebounced()
    }

    onAmountChange = (e) => {
        const amount = e.target.value

        // TODO take comma into account, eg try sk locale silver
        if (amount && !amount.match(/^\d+((\.|\,)\d{0,2})?$/))
            return

        this.setState((prevState) => ({
            expense: {
                ...prevState.expense,
                amount
            }
        }))

        this.validateFormDebounced()
    }

    onDateChange = (createdAt) => {
        this.setState((prevState) => ({
            expense: {
                ...prevState.expense,
                createdAt
            }
        }))
    }

    onNoteChange = (e) => {
        const note = e.target.value

        this.setState((prevState) => ({
            expense: {
                ...prevState.expense,
                note
            }
        }))
    }

    validateFormDebounced = debounce(
        () => this.validateForm(), 600
    )

    validateForm = () => {
        const expense = this.state.expense
        let errors = []

        if (!expense.description)
            errors = errors.concat('Description is required.')
        if (!expense.amount)
            errors = errors.concat('Amount is required.')
        if (!expense.createdAt)
            errors = errors.concat('CreatedAt is required.')

        this.setState(() => ({ errors }))

        return !!!errors.length
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (!this.validateForm())
            return

        const expense = this.state.expense

        this.props.onSubmit({
            ...expense,
            amount: parseFloat(expense.amount, 10) || 0,
            createdAt: expense.createdAt.valueOf()
        })
    }

    render() {
        return (
            <div>
                <FormErrors errors={this.state.errors} />
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input
                            type="text"
                            autoFocus
                            maxLength={255}
                            placeholder="Description..."
                            value={this.state.expense.description}
                            onChange={this.onDescriptionChange}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Amount..."
                            step={1.0}
                            value={this.state.expense.amount}
                            onChange={this.onAmountChange}
                            step={0.5}
                        />
                    </div>
                    <div>
                        <SingleDatePicker
                            id="created-at"
                            date={this.state.expense.createdAt}
                            onDateChange={this.onDateChange}
                            focused={this.state.datepickerFocused}
                            onFocusChange={({ focused }) => this.setState({ datepickerFocused: focused })}
                            isOutsideRange={() => false}
                            numberOfMonths={1}
                            placeholder="Created At..."
                            small={true}
                            daySize={32}
                        />
                    </div>
                    <div>
                        <textarea
                            cols="30"
                            rows="4"
                            placeholder="Note... (optional)"
                            value={this.state.expense.note}
                            onChange={this.onNoteChange}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value={this.props.expense ? 'Edit Expense' : 'Add Expense'}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
