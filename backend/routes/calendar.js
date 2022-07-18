const express = require('express');
const router = express.Router()
const {google} = require('googleapis')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../auth-keys')

//DO NOT INCLUDE THESE 2 VARS IN GIT COMMIT
// const GOOGLE_CLIENT_ID = clientId
// const GOOGLE_CLIENT_SECRET = clientSecret
const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000'
)

//why do we have to change the url for post and not get ?
router.post('/create-tokens', async (req,res,next) => {
    try {
        const {code} = req.body
        const {tokens} = await oauth2Client.getToken(code)
        res.send(tokens)
    } catch (error) {
        next(error)
    }
})

router.post('/create-event', async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = router