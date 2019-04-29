import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import { ExpenseListFilters } from '../../components/ExpenseListFilters'

import { filters, altFilters } from '../fixtures/filters'

describe('ExpenseListFilters component', () => {
    let setTextFilter, setStartDate, setEndDate, sortByDate,
        sortByAmount, wrapper

    beforeEach(() => {
        setTextFilter = jest.fn()
        setStartDate = jest.fn()
        setEndDate = jest.fn()
        sortByDate = jest.fn()
        sortByAmount = jest.fn()
        wrapper = shallow(
            <ExpenseListFilters
                filters={filters}
                setTextFilter={setTextFilter}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                sortByDate={sortByDate}
                sortByAmount={sortByAmount}
            />
        )
    })

    test('should render ExpenseListFilters correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should render ExpenseListFilters correctly with alt filters', () => {
        wrapper.setProps({
            filters: altFilters
        })

        expect(wrapper).toMatchSnapshot()
    })

    test('should handle setTextFilter', () => {
        const value = 'gas'

        wrapper.find('input').simulate('change', {
            target: { value }
        })

        expect(setTextFilter).toHaveBeenCalledTimes(1)
        expect(setTextFilter).toHaveBeenCalledWith(value)
    })

    test('should handle sortByDate', () => {
        const value = 'date'

        wrapper.setProps({
            filters: altFilters
        })

        wrapper.find('select').simulate('change', {
            target: { value }
        })

        expect(sortByDate).toHaveBeenCalledTimes(1)
    })

    test('should handle sortByAmount', () => {
        const value = 'amount'

        wrapper.find('select').simulate('change', {
            target: { value }
        })

        expect(sortByAmount).toHaveBeenCalledTimes(1)
    })

    test('should handle start and end date changes', () => {
        const startDate = moment(0).add('10', 'days')
        const endDate = moment(0).add('15', 'days')

        wrapper.find('withStyles(DateRangePicker)')
            .prop('onDatesChange')({
                startDate,
                endDate
            })

        expect(setStartDate).toHaveBeenCalledTimes(1)
        expect(setStartDate).toHaveBeenCalledWith(startDate)

        expect(setEndDate).toHaveBeenCalledTimes(1)
        expect(setEndDate).toHaveBeenCalledWith(endDate)
    })

    test('should handle date focus changes', () => {
        const datepickerFocused = 'endDate'

        wrapper.find('withStyles(DateRangePicker)')
            .prop('onFocusChange')(datepickerFocused)

        expect(wrapper.state().datepickerFocused).toBe(datepickerFocused)
    })
})
