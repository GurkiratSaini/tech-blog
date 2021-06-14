const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.findAll()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'post_title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'created_at']
            },
            {
                model: Post,
                attributes: ['post_title'],
                through: Vote,
                as: 'voted_posts'
            },
            {
                model: Comment,
                attributes: ['comment_content'],
                through: Vote,
                as: 'voted_comments'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


// create new user
// add handling to automatically login after creating account
router.post('/', (req, res) => {
    User.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
    )
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// login route
router.post('/login', (req, res) => {

});

// logout route
router.post('/logout', (req, res) => {

});

// update user
router.put('/:id', (req, res) => {
    User.update(
        {
            username: erq.body.username,
            email: req.body.email,
            password: req.body.password
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// delete user
router.delete('/:id', (req, res) => {
    User.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;