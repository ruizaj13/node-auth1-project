const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')

router.post('/register', (req, res) => {
    const {username, password} = req.body
    //encrypt password so its no longer a standard string
    const hashed = bcrypt.hashSync(password, 10) //10 here works as an exponent
    //save the username & password
    User.add({username, password: hashed, role:1}) //role here is only for this project, more than likely this would be selected by the client in the real world
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {{
        const loggedInUser = await User.findBy({ username }).first()
        if ( loggedInUser && bcrypt.compareSync(password, loggedInUser.password)) {
            req.session.user = loggedInUser
            res.json('access granted')
        } else {
            res.status(401).json('invalid credentials')
        }
    }} catch (err) {
        res.status(500).json(err.message)
    }
})

router.get('/logout', (req, res) => {
    if(req.session && req.session.user) {
        req.session.destroy(err => {
            if (err) {
                res.json('You are my slave now')
            } else {
                res.json('see ya')
            }
        })
    } else {
        res.end()
    }
})

module.exports = router