
const userService = require('../services/userService.js')
const USER_URL = '/user';


module.exports = (app) => {

    app.post(`${USER_URL}/signup`, (req, res) => {
        const user = req.body;
        var newUser = {
            "name": user.name,
            "password": user.password,
            "email": user.email,
            "address": user.address,
            "image": '',
            "rentedItems": [],
            "favoriteItems": []
        }
        userService.addUser(newUser)
            .then(addeduser => {
                req.session.user = addeduser;
                return res.json(addeduser);
            })
            .catch(err => {
                res.status(500).send('Could not add USER')
            })
    })
    app.post(`${USER_URL}/checkLogin`, (req, res) => {
        const user = req.body
        userService.checkLogin(user.user)
            .then(user => {
                req.session.user = user;
                return res.json(user)
            })
            .catch(err => res.status(401).send('Wrong user/pass'))
    })

    app.post(`${USER_URL}/favorites/:itemId`, (req, res) => {
        const itemId = req.params.itemId
        const user = req.body
        userService.addFavorites(itemId, user)
            .then((user) => {
                return res.json(user)
            })
    })

    app.get(`${USER_URL}/item/:userId`, (req, res) => {
        userService.getUserWithItems(req.params.userId)
            .then(userWithItems => {
                res.json(userWithItems);
            })
    })

    app.get(`${USER_URL}`, (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    app.get(`${USER_URL}/:userId`, (req, res) => {
        const user = req.params.userId;
        userService.getUserById(user)
            .then(user => res.json(user))
    })

    app.put(`${USER_URL}/:userId`, (req, res) => {
        const user = req.body;             
        userService.updateUser(user)
            .then(user => res.json(user))
            .catch(err => res.status(500).send('Could not update user'))
    })

}
