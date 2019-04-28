import React from 'react'
import { shallow } from 'enzyme'

import ExpenseDashboardPage from '../../components/ExpenseDashboardPage'

describe('ExpenseDashboardPage component', () => {
    test('should render ExpenseDashboardPage correctly', () => {
        const wrapper = shallow(<ExpenseDashboardPage />)

        expect(wrapper).toMatchSnapshot()
    })
})
