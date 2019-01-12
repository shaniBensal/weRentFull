const ObjectId = require('mongodb').ObjectId;
const DB_COLLECTION_NAME = 'item';

function query(name = '', minPrice = 0) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.find({}).toArray()
        })
}

function remove(itemId) {
    itemId = new ObjectId(itemId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.remove({ _id: itemId })
        })
}

function getById(itemId) {
    itemId = new ObjectId(itemId)
    // console.log(itemId);
    
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME)
            return collection.findOne({ _id: itemId })
        })
}

function getByOwnerId(ownerId) {
    return connectToMongo()
    .then(db => {
        const collection = db.collection(DB_COLLECTION_NAME)
        return collection.find({ ownerId: ownerId }).toArray()
    })
}

function add(item) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.insertOne(item)
                .then(result => {
                    item._id = result.insertedId;
                    return item;
                })
        })
}

function update(item) {
    item._id = new ObjectId(item._id)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.updateOne({ _id: item._id }, { $set: item })
                .then(res => {
                    return item;
                })
        })
}

function filter(criteria){
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.find(criteria).toArray()
        })
}


module.exports = {
    query,
    remove,
    getById,
    add,
    update,
    getByOwnerId,
    filter
}

function connectToMongo() {
    const MongoClient = require('mongodb').MongoClient;
    // const urlOLD = 'mongodb://galyo:momo123@ds237445.mlab.com:37445/items_db';
    const url = 'mongodb://sts:sts123@ds145881.mlab.com:45881/rentapp';
    return MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => client.db())
}

// require('mongodb').MongoClient.connect('mongodb://sts:sts123@ds145881.mlab.com:45881/rentapp').collection('item').find({}).toArray();


