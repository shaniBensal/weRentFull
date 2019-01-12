const TRANSACTION_URL = '/transaction';
const transactionService = require('../services/transactionService')

module.exports = (app) => {

    app.post(TRANSACTION_URL, (req, res) => {
        const transaction = req.body;
        transactionService.addTransaction(transaction)
            .then(transaction => res.json(transaction))
            .catch(err => res.status(500).send('Could not confim transaction'))
    })

    app.get(`${TRANSACTION_URL}/:ownerId`, (req, res) => {
        const ownerId = req.params.ownerId;
        transactionService.getOwnerTransactions(ownerId)
            .then(transactions => res.json(transactions))
    })

    app.get(`${TRANSACTION_URL}/activeTransactions/:renterId`, (req, res) => {
        const renterId = req.params.renterId;
        transactionService.getRenterTransactions(renterId)
            .then(transactions => res.json(transactions))
    })


    app.put(`${TRANSACTION_URL}/:transactionId`, (req, res) => {
        const transaction = req.body;
        var newTransaction = {
            _id: transaction._id,
            itemId: transaction.itemId,
            ownerId: transaction.ownerId,
            isNew: false,
            price: transaction.price,
            renterId: transaction.renterId,
            dates: transaction.dates
        }
        transactionService.updateTransaction(newTransaction)
            .then(newTransaction => res.json(newTransaction))
            .catch(err => res.status(500).send('Could not update item'))
    })

}

