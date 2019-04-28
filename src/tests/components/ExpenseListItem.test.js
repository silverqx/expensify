import React from 'react'
import { shallow } from 'enzyme'

import { ExpenseListItem } from '../../components/ExpenseListItem'

import { expensesWithIds as expenses } from '../fixtures/expenses'

describe('ExpenseListItem component', () => {
    test('should render ExpenseListItem with expense', () => {
        const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)

        expect(wrapper).toMatchSnapshot()
    })
})

