import React from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'

import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
    <div>
        <nav>
            <ul className="navigation">
                <li className="navigation__item">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/create">Add Expense</NavLink>
                </li>
            </ul>
        </nav>
        <div>
            <button onClick={startLogout}>Logout</button>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(
    undefined,
    mapDispatchToProps
)(Header)
