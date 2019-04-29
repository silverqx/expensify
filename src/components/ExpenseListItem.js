import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'

import { removeExpense } from '../actions/expenses'

// TODO find out how to correctly pass history and expense silver
export const ExpenseListItem = ({ dispatch, history, id, description, note, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>{description}</Link> - {amount} - {moment(createdAt).format('LL')}
        <button
            onClick={() => history.push(`/edit/${id}`)}
        >
            Edit
        </button>
        <button
            onClick={() => dispatch(removeExpense(id))}
        >
            Remove
        </button>
    </div>
)

export default withRouter(connect()(ExpenseListItem))
