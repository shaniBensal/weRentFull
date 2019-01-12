const ObjectId = require('mongodb').ObjectId;
const DB_COLLECTION_NAME = 'user';
const ItemService = require('./itemService');


function query() {
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            let users = collection.find({}).toArray()
            return users;
        })
}

function addUser(user) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.insertOne(user)
                .then(result => {
                    user._id = result.insertedId;
                    return user;
                })
        })
}

function checkLogin(creds) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.findOne({ name: creds.name })
        })
}

function getUserById(userId) {    
    userId = new ObjectId(userId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME)
            return collection.findOne({ _id: userId })
        })
}

function addFavorites(itemId, user) {
    var userId = user._id
    userId = new ObjectId(userId)
    itemId = new ObjectId(itemId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME)
            return collection.update(
                { _id: userId },
                { $push: { favoriteItems: itemId } }
            )
                .then(() => {
                    return collection.findOne({ _id: userId })

                })
        })
}

function updateUser(user) {    
    user._id = new ObjectId(user._id)
    return connectToMongo()
        .then(db => {
            const collection = db.collection(DB_COLLECTION_NAME);
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(res => {
                    return user;
                })
        })
}

async function getUserWithItems (id){
    var user  = await getUserById(id);
    var owendItems  = await ItemService.getByOwnerId(id);
    // owendItems = await Promise.all(owendItems.map(getItemWithFullBooking));
    // db.collection.find( { _id : { $in : [1,2,3,4] } } );

    var rentedItemsObjectIds = user.rentedItems.map(itemId => new ObjectId(itemId));
    var rentedItemsCriteria = { _id : {$in: rentedItemsObjectIds}};
    var rentedItems =  await ItemService.filter(rentedItemsCriteria);

    var favoriteItemsObjectIds = user.favoriteItems.map(itemId => new ObjectId(itemId));
    var favoriteItemsCriteria = { _id : {$in: favoriteItemsObjectIds}};
    var favoriteItems =  await ItemService.filter(favoriteItemsCriteria);

    
    

    return {
        user : user,
        owendItems : owendItems,
        rentedItems : rentedItems,
        favoriteItems : favoriteItems
    }

}

function getItemWithFullBooking(item) {
    return Promise.all(item.bookings.map(booking => {
        return getUserById(booking.renterId)
    }))
    .then(renters => {
        item.bookings.map((booking, i) => booking.renter = renters[i]);
        return item;
    })
}


// getUserWithItems('5b5ae4606896b0b4bcd5f8a4')
// .then(x => {
//     console.log(x)
// })


module.exports = {
    query,
    getUserById,
    checkLogin,
    addUser,
    addFavorites,
    getUserWithItems,
    updateUser
}

function connectToMongo() {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://sts:sts123@ds145881.mlab.com:45881/rentapp';
    return MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => client.db())
}