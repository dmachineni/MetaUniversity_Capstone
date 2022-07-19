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
        console.log('tokens', tokens)

        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);
        query.equalTo("idToken", tokens.id_token);
        query.first()
            .then (results => {
                console.log('res', results)
                console.log('tokens id', typeof(tokens.id_token))
                if(results === undefined) {
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
        
                    // query.equalTo("idToken", tokens.id_token);
                    // const obj = await query.first();
                    // console.log("finding obj", obj)
                    res.send({"message": "created a new user", "userLists":[], "id":"not working as of now", "tokens":tokens})
                    console.log("bye")
        
                } else {
                    res.send({"message": "returning user", "userLists": results.get("userLists"),"id": results.get("id"),"tokens":tokens})
                }
            })
            .catch (error => next(error))
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