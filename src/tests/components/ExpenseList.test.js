import React from 'react'
import { shallow } from 'enzyme'

import { ExpenseList } from '../../components/ExpenseList'

import { expensesWithIds as expenses } from '../fixtures/expenses'

describe('ExpenseList component', () => {
    test('should render ExpenseList with expenses', () => {
        const wrapper = shallow(<ExpenseList expenses={expenses} />)

        expect(wrapper).toMatchSnapshot()
    })

    test('should render ExpenseList with empty expenses', () => {
        const wrapper = shallow(<ExpenseList expenses={[]} />)

        expect(wrapper).toMatchSnapshot()
    })
})
