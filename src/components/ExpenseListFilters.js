import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'

// TODO clear input on esc, use hoc https://github.com/amytych/react-escape-outside/blob/master/index.js
class ExpenseListFilters extends Component {
    state = {
        datepickerFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate))
        this.props.dispatch(setEndDate(endDate))
    }

    getSortFilter = (value) => {
        const mapValueToFilter = {
            date: sortByDate,
            amount: sortByAmount
        }
        const sortFilter = mapValueToFilter[value]

        return sortFilter()
    }

    render() {
        return (
            <div>
                <input
                    autoFocus
                    type="text"
                    value={this.props.filters.text}
                    onChange={e => this.props.dispatch(setTextFilter(e.target.value))}
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={e => this.props.dispatch(this.getSortFilter(e.target.value))}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    startDateId="created-at-start-date"
                    endDateId="created-at-end-date"
                    startDatePlaceholderText="Start Date..."
                    endDatePlaceholderText="End Date..."
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                    small={true}
                    daySize={32}
                    showClearDates={true}
                    focusedInput={this.state.datepickerFocused}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={datepickerFocused => this.setState({ datepickerFocused })}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ filters }) => ({
    filters
})

export default connect(mapStateToProps)(ExpenseListFilters)
