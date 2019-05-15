import React from 'react'
import numeral from "numeral"
import selectExpensesTotal from "../selectors/expenses-total"
import selectExpenses from '../selectors/expenses'
import { connect } from 'react-redux'

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
    <h1>{`You have ${expenseCount} ${expenseCount === 1 ? 'expense' : 'expenses'}, totalling ${numeral((expensesTotal) / 100).format('$0,0.00')}`}</h1>
)

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)