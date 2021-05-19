const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentdata => res.json(dbCommentdata))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// create new comment, add handling for session
router.post('/', (req, res) => {
    if (req.session) {
        Comment.create(
            {
                comment_content: req.body.comment_content,
                user_id: req.session.user_id,
                post_id: req.body.post_id
            }
        )
            .then(dbCommentdata => res.json(dbCommentdata))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
});

// update a comment, add handling for session
router.put('/:id', (req, res) => {
    if (req.session) {
        Comment.update(
            {
                comment_content: req.body.comment_content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(dbCommentdata => {
                if (!dbCommentdata) {
                    res.status(404).json({ message: 'No comment found with that id' });
                    return;
                }
                res.json(dbCommentdata);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
})

// delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbCommentdata => {
            if (!dbCommentdata) {
                res.status(404).json({ message: 'No comment found with that id' });
                return;
            }
            res.json(dbCommentdata);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;