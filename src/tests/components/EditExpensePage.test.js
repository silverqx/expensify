import React from 'react'
import { shallow } from 'enzyme'

import { EditExpensePage } from '../../components/EditExpensePage';

import expenses from '../fixtures/expenses'

describe('EditExpensePage component', () => {
    let editExpense, history, wrapper, match

    beforeEach(() => {
        editExpense = jest.fn()
        history = { push: jest.fn() }
        match = {
            params: {
                id: expenses[0].id
            }
        }

        wrapper = shallow(<EditExpensePage
            expense={expenses[0]}
            editExpense={editExpense}
            history={history}
            match={match}
        />)
    })

    test('should render EditExpensePage correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should handle editExpense on form onSubmit', () => {
        const updatedExpense = {
            ...expenses[0],
            description: 'Water Bill Updated',
            amount: 155.25
        }

        wrapper.find('ExpenseForm').prop('onSubmit')(updatedExpense)

        expect(editExpense).toHaveBeenCalledTimes(1)
        expect(editExpense).toHaveBeenCalledWith(
            match.params.id,
            updatedExpense
        )

        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/')
    })
})
