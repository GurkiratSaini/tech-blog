const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// get all posts
// fix comment vote association with parent post
router.get('/', (req, res) => {
    Post.findAll(
        {
            attributes: [
                'id',
                'post_title',
                'post_content',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_content',
                        'post_id',
                        'user_id',
                        'created_at',
                        [sequelize.literal('(SELECT COUNT(*) FROM vote, comment WHERE comment.id = vote.comment_id)'), 'vote_count']
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        }
    )
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// get one post
router.get('/:id', (req, res) => {
    Post.findOne(
        {
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_title',
                'post_content',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_content',
                        'post_id',
                        'user_id',
                        'created_at',
                        [sequelize.literal('(SELECT COUNT(*) FROM vote, comment WHERE comment.id = vote.comment_id)'), 'vote_count']
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with that id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// create new post, add handling for session
router.post('/', (req, res) => {
    Post.create(
        {
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        }
    )
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// update post
router.put('/:id', (req, res) => {
    Post.update({
        post_title: req.body.post_title,
        post_content: req.body.post_content
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with that id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// delete post
router.delete('/:id', (req, res) => {
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with that id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;