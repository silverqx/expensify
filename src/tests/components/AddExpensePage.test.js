import React from 'react'
import { shallow } from 'enzyme'

import { AddExpensePage } from '../../components/AddExpensePage'

import expenses from '../fixtures/expenses'

describe('AddExpensePage component', () => {
    let startAddExpense, history, wrapper

    beforeEach(() => {
        startAddExpense = jest.fn()
        history = { push: jest.fn() }
        wrapper = shallow(
            <AddExpensePage
                startAddExpense={startAddExpense}
                history={history}
            />
        )
    })

    test('should render AddExpensePage correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should handle startAddExpense on form onSubmit', () => {
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])

        expect(startAddExpense).toHaveBeenCalledTimes(1)
        expect(startAddExpense).toHaveBeenCalledWith(expenses[0])

        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/')
    })

    test('should go to home on form onCancel', () => {
        wrapper.find('ExpenseForm').prop('onCancel')()

        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/')
    })
})
