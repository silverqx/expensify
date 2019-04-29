import React from 'react'
import { shallow } from 'enzyme'

import { AddExpensePage } from '../../components/AddExpensePage';

import expenses from '../fixtures/expenses'

describe('AddExpensePage component', () => {
    let addExpense, history, wrapper

    beforeEach(() => {
        addExpense = jest.fn()
        history = { push: jest.fn() }
        wrapper = shallow(<AddExpensePage
            addExpense={addExpense}
            history={history}
        />)
    })

    test('should render AddExpensePage correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should handle addExpense on form onSubmit', () => {
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])

        expect(addExpense).toHaveBeenCalledTimes(1)
        expect(addExpense).toHaveBeenCalledWith(expenses[0])

        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/')
    })
})
