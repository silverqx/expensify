import React from 'react'
import { NavLink } from "react-router-dom"

const Header = () => (
    <nav>
        <ul className="navigation">
            <li className="navigation__item">
                <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/create">Add Expense</NavLink>
            </li>
            <li>
                <NavLink to="/edit/12">Edit Expense</NavLink>
            </li>
        </ul>
    </nav>
)

export default Header
