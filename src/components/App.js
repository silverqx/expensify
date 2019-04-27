import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom"
import ReactModal from 'react-modal'

import ExpenseDashboardPage from './ExpenseDashboardPage'
import AddExpensePage from './AddExpensePage'
import EditExpensePage from './EditExpensePage'
import NotFoundPage from './NotFoundPage'

import ModalOption from './ModalOption'

import { clearInputValue } from '../utils/utils'

// Make sure to bind modal to your appElement
// (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#app')

export default class ExpensifyApp extends Component {
    static defaultProps = {
        title: 'Expensify'
    }

    state = {
        error: null,
        subtitle: 'Xxx',
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    /**
     * Update Error state.
     *
     * @param {string} error - Error message.
     *
     * @returns {?boolean} True every time.
     */
    handleError = (error) => {
        this.setState(() => ({ error }))

        return true
    }

    /**
     * Clear Error state.
     *
     * @returns {?boolean} False every time.
     */
    clearError = () => {
        this.setState(() => ({ error: null}))

        return false
    }

    render() {
        return (
            <Router>
                <div className="container">
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
                    <Switch>
                        <Route path="/" exact component={ExpenseDashboardPage} />
                        <Route path="/create" component={AddExpensePage} />
                        <Route path="/edit/:id" component={EditExpensePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                    <ModalOption
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                    />
                </div>
            </Router>
        )
    }
}
