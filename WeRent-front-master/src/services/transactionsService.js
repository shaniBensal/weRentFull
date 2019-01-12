
import axios from 'axios'
const TRANSACTION_URL = (process.env.NODE_ENV !== 'development')
    ? '/transaction'
    : '//localhost:3000/transaction';

function newTransaction(transaction){
       return axios.post(TRANSACTION_URL, transaction)
        .then(res => res.data)
}

function getTransactionsByOwner(ownerId){
    return axios.get(`${TRANSACTION_URL}/${ownerId}`)
        .then(res => res.data)
}

function getTransactionsByRenter(ownerId){
    return axios.get(`${TRANSACTION_URL}/activeTransactions/${ownerId}`)
    .then(res => res.data)
}

function updateTransaction(transaction){
    return axios.put(`${TRANSACTION_URL}/${transaction._id}`, transaction)
        .then(res => res.data)
}

export default {
    newTransaction,
    getTransactionsByOwner,
    getTransactionsByRenter,
    updateTransaction
}