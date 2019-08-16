import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import numeral from 'numeral'
import 'numeral/locales/sk'

import { startRemoveExpense } from '../actions/expenses'

numeral.locale('sk')

// TODO find out how to correctly pass history and expense silver
export const ExpenseListItem = ({ dispatch, history, id, description, note, amount, createdAt}) => (
    <Link to={`/edit/${id}`} className="list-item">
        <div>
            <h3 className="list-item__title">{description}</h3>
            <div className="list-item__created-at">{moment(createdAt).format('LL')}</div>
        </div>
        <div className="list-item__amount">{numeral(amount).format('$0,0.00')}</div>
    </Link>
)

export default withRouter(connect()(ExpenseListItem))
