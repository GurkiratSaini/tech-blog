const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll()
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;