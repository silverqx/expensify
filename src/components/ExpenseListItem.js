import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import 'numeral/locales/sk'

numeral.locale('sk')

export const ExpenseListItem = ({ id, description, amount, createdAt}) => (
    <Link to={`/edit/${id}`} className="list-item">
        <div>
            <h3 className="list-item__title">{description}</h3>
            <div className="list-item__created-at">{moment(createdAt).format('LL')}</div>
        </div>
        <div className="list-item__amount">{numeral(amount).format('$0,0.00')}</div>
    </Link>
)

export default connect()(ExpenseListItem)
