import React from 'react'
import { shallow } from 'enzyme'

import { EditExpensePage } from '../../components/EditExpensePage'

import { expensesWithIds as expenses } from '../fixtures/expenses'

describe('EditExpensePage component', () => {
    let startEditExpense, history, wrapper

    beforeEach(() => {
        startEditExpense = jest.fn()
        history = { push: jest.fn() }

        wrapper = shallow(
            <EditExpensePage
                expense={expenses[0]}
                startEditExpense={startEditExpense}
                history={history}
            />
        )
    })

    test('should render EditExpensePage correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should handle startEditExpense on form onSubmit', () => {
        const updatedExpense = {
            ...expenses[0],
            description: 'Water Bill Updated',
            amount: 155.25
        }

        wrapper.find('ExpenseForm').prop('onSubmit')(updatedExpense)

        expect(startEditExpense).toHaveBeenCalledTimes(1)
        expect(startEditExpense).toHaveBeenCalledWith(
            expenses[0].id,
            updatedExpense
        )

        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/')
    })
})
