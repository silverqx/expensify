import React, { Component } from 'react'
import { Router, Route, Switch } from "react-router-dom"
import ReactModal from 'react-modal'
import { createBrowserHistory } from 'history'

import ExpenseDashboardPage from './ExpenseDashboardPage'
import AddExpensePage from './AddExpensePage'
import EditExpensePage from './EditExpensePage'
import LoginPage from './LoginPage'
import NotFoundPage from './NotFoundPage'

import ModalOption from './ModalOption'
import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'

// import { clearInputValue } from '../utils/utils'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

// Make sure to bind modal to your appElement
// (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#app')

export const history = createBrowserHistory()

export default class ExpensifyApp extends Component {
    static defaultProps = {
        title: 'Expensify'
    }

    state = {
        error: null,
        // TODO implement subtitle silver
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
            <Router history={history}>
                <Switch>
                    <PublicRoute path="/" exact component={LoginPage} />
                    <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                    <PrivateRoute path="/create" component={AddExpensePage} />
                    <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <ModalOption
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </Router>
        )
    }
}
