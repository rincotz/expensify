import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    setExpenses,
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    startRemoveExpense,
    startEditExpense
} from "../../actions/expenses";
import expenses from '../fixtures/expenses'
import db from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

let store

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        return db.collection('expenses').doc(id).set({ description, note, amount, createdAt })
    })
    done()
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenses[2]
        }
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'New mouse',
        createdAt: 1000000000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        db.collection('expenses').doc(actions[0].expense.id).get().then((doc) => {
            expect(doc.data()).toEqual(expenseData)
            done()
        })
    })
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({})
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                amount: 0,
                note: '',
                createdAt: 0
            }
        })
        done()
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('345def', { note: 'New note value'})
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '345def',
        updates: {
            note: 'New note value'
        }
    })
})

test('should edit expenses from firebase', (done) => {
    const store = createMockStore({})
    const id = expenses[1].id
    const updates = { amount: 2300 }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        return db.collection('expenses').doc(id).get().then((doc) => {
            expect(doc.data().amount).toBe(updates.amount)
            done()
        })
    })
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expenses from firebase', (done) => {
    const store = createMockStore({})
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        return db.collection('expenses').doc(id).get().then((doc) => {
            expect(doc.data()).toBeFalsy()
            done()
        })
    })
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

// test('should fetch the expenses from firebase', (done) => {
//     const store = createMockStore({})
//     store.dispatch(startSetExpenses()).then(() => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'SET_EXPENSES',
//             expenses
//         })
//         done()
//     })
// })