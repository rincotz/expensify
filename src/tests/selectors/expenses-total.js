import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
    const wrapper = selectExpensesTotal()
    expect(wrapper).toEqual(0)
})

test('should correctly add up a single expense', () => {
    const wrapper = selectExpensesTotal(expenses[0])
    expect(wrapper).toEqual(expenses[0].amount)
})

test('should correctly add up multiple expenses', () => {
    const wrapper = selectExpensesTotal(expenses)
    expect(wrapper).toEqual(expenses[0].amount + expenses[1].amount + expenses[2].amount)
})