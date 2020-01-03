let axios = require('axios')
let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')

//Non-admin profile page GET /profile
router.get('/', isLoggedIn, (req, res) => {
    res.render('profile/main', )
})

//Admin profile page GET /profile/admin
router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})

// GET /profile/repos
router.get('/repos', isLoggedIn, (req, res) => {
    // Grab page number if it exists
    let page = parseInt(req.query.page) || 1

    //Make sure user has github information
    if (req.user.githubToken){
        axios.get('https://api.github.com/user/repos?per_page=10&page='+page, {
            headers: {
                Authorization: `token ${req.user.githubToken}`,
                'User-Agent': 'Express-Auth-Boiler'
            }
        })
        .then(response => {
            res.render('profile/repos', { repos: response.data, page })
        })
        .catch(err => {
            console.log(err)
            res.render('error')
        })
    }
    else {
        res.render('profile/repos', { repos: null, page })
    }
})

module.exports = router