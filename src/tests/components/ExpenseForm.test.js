import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import ExpenseForm from '../../components/ExpenseForm'

import expenses from '../fixtures/expenses'

describe('ExpenseForm component', () => {
    test('should render ExpenseForm with default values', () => {
        const wrapper = shallow(<ExpenseForm />)

        expect(wrapper).toMatchSnapshot()
    })

    test('should render ExpenseForm with expense data', () => {
        const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)

        expect(wrapper).toMatchSnapshot()
    })

    // TODO test FormErrors silver
    test('should render error for invalid ExpenseForm submission', () => {
        const wrapper = shallow(<ExpenseForm />)

        expect(wrapper.state().errors.length).toBe(0)
        expect(wrapper).toMatchSnapshot()

        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        })

        expect(wrapper.state().errors.length).toBeGreaterThan(0)
        expect(wrapper).toMatchSnapshot()
    })

    test('should set description on input change', () => {
        const value = 'New Description'
        const wrapper = shallow(<ExpenseForm />)

        wrapper.find('form input').at(0).simulate('change', {
            target: { value }
        })

        expect(wrapper.state().expense.description).toBe(value)
        expect(wrapper).toMatchSnapshot()
    })

    test('should set note on textarea change', () => {
        const value = 'New Note'
        const wrapper = shallow(<ExpenseForm />)

        wrapper.find('form textarea').simulate('change', {
            target: { value }
        })

        expect(wrapper.state().expense.note).toBe(value)
        expect(wrapper).toMatchSnapshot()
    })

    test('should set amount on input change', () => {
        const value = '25.55'
        const wrapper = shallow(<ExpenseForm />)

        wrapper.find('form input').at(1).simulate('change', {
            target: { value }
        })

        expect(wrapper.state().expense.amount).toBe(value)
        expect(wrapper).toMatchSnapshot()
    })

    test('should not set amount on invalid input', () => {
        const value = '15.355'
        const expectedValue = ''
        const wrapper = shallow(<ExpenseForm />)

        wrapper.find('form input').at(1).simulate('change', {
            target: { value }
        })

        expect(wrapper.state().expense.amount).toBe(expectedValue)
        expect(wrapper).toMatchSnapshot()
    })

    test('should call onSubmit prop for valid form submission', () => {
        const onSubmitSpy = jest.fn()
        const wrapper = shallow(
            <ExpenseForm
                expense={expenses[1]}
                onSubmit={onSubmitSpy}
            />
        )

        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        })

        expect(wrapper.state().errors).toEqual([])
        expect(onSubmitSpy).toHaveBeenCalledTimes(1)
        expect(onSubmitSpy).toHaveBeenCalledWith(expenses[1])
        expect(wrapper).toMatchSnapshot()
    })


    test('should set createdAt date on date change', () => {
        const createdAt = moment()
        const wrapper = shallow(<ExpenseForm />)

        // <SingleDatePicker />
        wrapper.find('#created-at').prop('onDateChange')(createdAt)

        expect(wrapper.state().expense.createdAt).toEqual(createdAt)
    })

    test('should set datepickerFocused on SingleDatePicker focus', () => {
        const focused = true
        const wrapper = shallow(<ExpenseForm />)

        expect(wrapper.state().datepickerFocused).toBe(false)

        // <SingleDatePicker />
        wrapper.find('#created-at').prop('onFocusChange')({ focused })

        expect(wrapper.state().datepickerFocused).toBe(true)
    })

    test('should show Edit Expense as button value on edit', () => {
        const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)

        const value = wrapper.find('input[type="submit"]').prop('value')

        expect(value).toBe('Edit Expense')
    })

    test('should show Add Expense as button value on add', () => {
        const wrapper = shallow(<ExpenseForm />)

        const value = wrapper.find('input[type="submit"]').prop('value')

        expect(value).toBe('Add Expense')
    })
})
