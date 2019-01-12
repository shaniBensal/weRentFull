const ObjectId = require('mongodb').ObjectId;
const DB_COLLECTION_NAME = 'transaction';

function addTransaction(transaction) {
    transaction.ownerId = new ObjectId(transaction.ownerId)
    transaction.renterId = new ObjectId(transaction.renterId)
    transaction.itemId = new ObjectId(transaction.itemId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.insertOne(transaction)
                .then(result => {
                    transaction._id = result.insertedId;
                    return transaction;
                })
        })
}

function getOwnerTransactions(ownerId) {
    const criteria = {}
    criteria.ownerId = new ObjectId(ownerId);
    return connectToMongo().then(db => {
        return db.collection(DB_COLLECTION_NAME)
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                        {
                            from: 'item',
                            localField: 'itemId',
                            foreignField: '_id',
                            as: 'item'
                        }
                },
                {
                    $unwind: '$item'
                },
                {
                    $lookup:
                        {
                            from: 'user',
                            localField: 'renterId',
                            foreignField: '_id',
                            as: 'rentedTo'
                        }
                },
                {
                    $unwind: '$rentedTo'
                }
            ]).toArray()
    })
}

function getRenterTransactions(renterId) {
    const criteria = {}
    criteria.renterId = new ObjectId(renterId)
    // console.log(renterId)
    return connectToMongo().then(db => {
        return db.collection(DB_COLLECTION_NAME)
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                        {
                            from: 'item',
                            localField: 'itemId',
                            foreignField: '_id',
                            as: 'item'
                        }
                },
                {
                    $unwind: '$item'
                },
                {
                    $lookup:
                        {
                            from: 'user',
                            localField: 'ownerId',
                            foreignField: '_id',
                            as: 'fromOwner'
                        }
                },
                {
                    $unwind: '$fromOwner'
                }
            ]).toArray()
    })
}

function updateTransaction(transaction) {
    transaction._id = new ObjectId(transaction._id)
    transaction.ownerId = new ObjectId(transaction.ownerId)
    transaction.renterId = new ObjectId(transaction.renterId)
    transaction.itemId = new ObjectId(transaction.itemId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.updateOne({ _id: transaction._id }, { $set: transaction })
                .then(res => {
                    return transaction;
                })
        })
}



module.exports = {
    addTransaction,
    getOwnerTransactions,
    getRenterTransactions,
    updateTransaction
}

function connectToMongo() {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://sts:sts123@ds145881.mlab.com:45881/rentapp';
    return MongoClient.connect(url)
        .then(client => client.db())
}

