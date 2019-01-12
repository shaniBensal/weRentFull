const ITEM_URL = '/item';
const itemService = require('../services/itemService')

module.exports = (app) => {

    app.get(`${ITEM_URL}`, (req, res) => {
        itemService.query()
            .then(items => {
                res.json(items)
            })
    })

    app.get(`${ITEM_URL}/:itemId`, (req, res) => {
        const itemId = req.params.itemId;
        itemService.getById(itemId)
            .then(item => res.json(item))
    })

    app.get(`${ITEM_URL}/query/:ownerId`, (req, res) => {
        const ownerId = req.params.ownerId;
        itemService.getByOwnerId(ownerId)
            .then(item => res.json(item))
    })


    app.delete(`${ITEM_URL}/:itemId`, (req, res) => {
        const itemId = req.params.itemId;
        itemService.remove(itemId)
            .then(() => res.end(`Item ${itemId} Deleted `))
    })

    app.post(ITEM_URL, (req, res) => {
        const item = req.body;
        const user = req.session.user
        var addedItem = item
        addedItem.dateCreated = Date.now()
        addedItem.ownerId = user._id
        itemService.add(addedItem)
            .then(addedItem => {
                res.json(addedItem)
            })
            .catch(err => res.status(500).send('Could not add item'))
    })

    app.put(`${ITEM_URL}/:itemId`, (req, res) => {
        const item = req.body;
        itemService.update(item)
            .then(item => res.json(item))
            .catch(err => res.status(500).send('Could not update item'))
    })

   
}
