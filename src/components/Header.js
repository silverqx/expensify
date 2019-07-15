import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
    <div className="header">
        <div className="content-container">
            <div className="header__content">
                <Link to="/dashboard" className="header__title">
                    <h1>Expensify</h1>
                </Link>
                <button
                    onClick={startLogout}
                    className="button button--link"
                >Logout</button>
            </div>
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
