import React from 'react'
import { shallow } from 'enzyme'

import { ExpensesSummary } from '../../components/ExpensesSummary'

describe('ExpensesSummary component', () => {
    test('should correctly render ExpensesSummary with 1 expense', () => {
        const wrapper = shallow(
            <ExpensesSummary
                expensesCount={1}
                expensesTotal={50.25}
            />)

        expect(wrapper).toMatchSnapshot()
    })

    test('should correctly render ExpensesSummary multiple expenses', () => {
        const wrapper = shallow(
            <ExpensesSummary
                expensesCount={5}
                expensesTotal={244.32}
            />)

        expect(wrapper).toMatchSnapshot()
    })
})
