import axios from 'axios'
import {GET_ERRORS, GET_WALLETS, DELETE_WALLET, GET_WALLET,GET_TRANSACTIONS, GET_TRANSACTION,ADD_TRANSACTION,DELETE_TRANSACTION,UPDATE_TRANSACTION} from './types'

export const createWallet = (newWallet, history) => async dispath => {
    await axios.post('http://localhost:8080/wallet', newWallet)
        .then((res) => {
            history.push('/dashboard')
        }).catch((err) => {
            dispath({type:GET_ERRORS,payload:err.response.data})
        })
}
export const updateWallet = (id,updatedWallet, history) => async dispath => {
    await axios.put(`http://localhost:8080/wallet/${id}`, updatedWallet)
        .then((res) => {
            history.push('/dashboard')
        }).catch((err) => {
            dispath({type:GET_ERRORS,payload:err.response.data})
        })
}

export const getWallets = () => async dispath => {
    await axios.get('http://localhost:8080/wallet')
        .then((res) => {
            dispath({type:GET_WALLETS,payload:res.data})
        })
}
export const getWallet = (id) => async dispath => {
    await axios.get(`http://localhost:8080/wallet/${id}`)
        .then((res) => {
            dispath({type:GET_WALLET,payload:res.data})
        })
}

export const deleteWallet = (id) => async dispath => {
    await axios.delete(`http://localhost:8080/wallet/${id}`)
        .then((res) => {
            dispath({type:DELETE_WALLET,payload:id})
        })
}


//Transactions


export const createTransaction = (newTransaction, walletId) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:8080/transaction/${walletId}`, newTransaction);
        dispatch({ type: ADD_TRANSACTION, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
};


// Action to get a specific transaction
export const getTransaction = (walletId, transactionId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:8080/transaction/${walletId}/${transactionId}`);
        dispatch({ type: GET_TRANSACTION, payload: response.data });
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching transaction:', error);
        return null; // Return null in case of error
    }
};


export const getTransactions = (walletId) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/transaction/${walletId}`);
    dispatch({ type: GET_TRANSACTIONS, payload: res.data });
};

// Action to update a transaction
export const updateTransaction = (walletId, transactionId, updatedTransaction) => async dispatch => {
    await axios.put(`http://localhost:8080/transaction/${walletId}/${transactionId}`, updatedTransaction);
    dispatch({ type: UPDATE_TRANSACTION, payload: updatedTransaction });
};





export const deleteTransaction = (walletId, transactionId) => async dispatch => {
    try {
        await axios.delete(`http://localhost:8080/transaction/${walletId}/${transactionId}`);
        console.log(transactionId);
        dispatch({
            type: DELETE_TRANSACTION,
            payload: transactionId
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        // Handle error as needed
    }
};



