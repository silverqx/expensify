const findExpense = (state, { history, match }) => {
    const expense = state.expenses.find(
        expense => expense.id === match.params.id
    )

    if (!expense)
        return history.goBack()

    return expense
}

export default findExpense
