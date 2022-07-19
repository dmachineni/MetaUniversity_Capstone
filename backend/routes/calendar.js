const express = require('express');
const router = express.Router()
const {google} = require('googleapis')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../auth-keys')

const Parse = require('parse/node')
Parse.initialize("WrhhT0n3PD3RkdESL6pAsvqN86YDNS9eP0v1VdZg", "WliFyOgGrffxxYv0IfvChkvx8a1ByDYKY7tadIDW")
Parse.serverURL = "https://parseapi.back4app.com"


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

        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);
        await query.equalTo("idToken", tokens.id_token);
        const results = await query.find();
        console.log('res', JSON.stringify(results))
        console.log('tokens id', JSON.stringify(tokens.id_token))
        // res.send(results)

        if(results.length === 0) {
            console.log("hi")
            const userObject = new UserInfo();
            userObject.set("idToken", tokens.id_token)
            userObject.set("refreshToken", '1//0d_m-1e_31rw0CgYIARAAGA0SNwF-L9IrFRzOCIot1X_OnrHje1v9UKmTU0ONLUmflwF8BnA5_JtPZOo2ijfk0Lng5GTlEqiw1jM')
            // userObject.set("refreshToken", tokens.refresh_token)
            userObject.set("userLists", [])
            userObject.save()
                // .then(res.send({"message": "created a new user", "userLists":[]}))
                .catch(error => next(error))
            console.log("created obj")

            await query.equalTo("idToken", tokens.id_token);
            const obj = await query.find();
            console.log("finding obj", obj)
            res.send({"message": "created a new user", "userLists":[], "id":obj})
            console.log("bye")

        } else {
            res.send({"message": "returning user", "userLists": results[0].userLists,"id": results[0].id})
        }
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