const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Comment,
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
        })
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({ plain: true }));
                res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
    else {
        res.redirect('/login');
    }
});

router.get('/edit/:id', (req, res) => {
    if (req.session.loggedIn) {
        Post.findOne(
            {
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: Comment,
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
                if (dbPostData) {
                    const post = dbPostData.get({ plain: true });

                    res.render('edit-post', { post, loggedIn: req.session.loggedIn });
                }
                else {
                    res.status(500).json(err);
                }
            })
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;