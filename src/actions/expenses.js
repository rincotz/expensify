import uuid from 'uuid';
import db from '../firebase/firebase'

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// component calls action generator
// action generator returns function
// component dispatches function
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }

        return db.collection('expenses')
            .add(expense)
            .then((docRef) => {
                dispatch(addExpense({
                    id: docRef.id,
                    ...expense
                }))
        })
    }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return db.collection('expenses').doc(id).delete().then(() => {
            dispatch(removeExpense({ id }))
            })
    }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return db.collection('expenses').doc(id).update(updates)
            .then(() => {
                dispatch(editExpense(id, updates))
            })
}
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch) => {
        return db.collection('expenses')
            .get()
            .then((querySnapshot) => {
                const expenses = []
                querySnapshot.forEach((doc) => {
                    expenses.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                dispatch(setExpenses(expenses))
            })
    }
}