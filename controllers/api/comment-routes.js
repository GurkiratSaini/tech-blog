const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentdata => res.json(dbCommentdata))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;