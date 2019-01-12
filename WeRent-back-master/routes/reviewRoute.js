const reviewService = require('../services/reviewService.js')
const REV = '/review'

module.exports = (app) => {

    app.get(REV, (req, res) => {  
        const toyId = req.query.toyId                      
        reviewService.query(toyId)
            .then( reviews => res.json(reviews))
    })

    app.post(REV, (req, res) => {
        var review = {
            userId: req.session.user._id,
            toyId: req.body.toyId,
            content: req.body.content
        }
        reviewService.addReview(review)
            .then(review => res.json(review))
    })
}


