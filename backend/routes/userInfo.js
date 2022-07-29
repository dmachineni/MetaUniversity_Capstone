const express = require('express');
const router = express.Router()
const {google} = require('googleapis')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../auth-keys')
const axios = require('axios')

const Parse = require('parse/node')
Parse.initialize("WrhhT0n3PD3RkdESL6pAsvqN86YDNS9eP0v1VdZg", "WliFyOgGrffxxYv0IfvChkvx8a1ByDYKY7tadIDW")
Parse.serverURL = "https://parseapi.back4app.com"


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000'
)

async function verify(token) {
  const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload()
  const userid = payload['sub']
}

router.post('/create-tokens', async (req,res,next) => {
    try {
        const {code} = req.body
        const {tokens} = await oauth2Client.getToken(code)
        verify(tokens.id_token).catch(console.error);
        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);
        let idTokenClaims = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokens.id_token}`)

        //TODO: this is breaking
        // if (idTokenClaims.data.aud.contains(GOOGLE_CLIENT_ID)) {
            query.equalTo("sub", idTokenClaims.data.sub);
            await query.first()
                .then ( async result => {
                    if(result === undefined) {
                        const userObject = new UserInfo();

                        userObject.set("sub", idTokenClaims.data.sub)
                        userObject.set("idToken", tokens.id_token)
                        userObject.set("name", idTokenClaims.data.name)
                        userObject.set("firstName", idTokenClaims.data.given_name)
                        userObject.set("email", idTokenClaims.data.email)
                        userObject.set("refreshToken", tokens.refresh_token)
                        userObject.set("userLists", [])
                        userObject.save()
                            .then(userObject =>{
                                const {sub,name,email} = idTokenClaims.data
                                res.send({"objectId":userObject.id,message: "created a new user", "userLists":[], "tokens":tokens, sub, name, firstName:idTokenClaims.data.given_name, email})        
                            })
                            .catch(error => {next(error)})

                    } else {
                        res.send({"message": "returning user", "userLists": result.get("userLists"),"objectId": result.id,"tokens":tokens, "sub":idTokenClaims.data.sub, "name":result.get("name"), "firstName":result.get("firstName"), "email":result.get("email")})
                    }
                })
                .catch (error => {next(error)})
        // } else {
        //     res.send("not valid")
        // }

       
    } catch (error) {
        {next(error)}
    }
})

router.post('/create-new-user-list', (req,res,next) => {
    try {
        console.log("hi from backend", req.body)
        const {listName} = req.body //string
        let recipes = req.body.recipes //array of objs
        recipes = [{"id":"CBrIXvVYEM","name":"Ube Halaya","thumbnail_url":"https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/33b31a7e1c77404faf157c5dd848ad49.jpeg","description":"Ube halaya, also known as “purple yam jam,” is a classic Filipino dessert that can be eaten on its own or used as a topping or filling in many other desserts. It is made with mashed up purple yams, evaporated milk, and ube or regular condensed milk for a silky smooth, rich texture. This creamy and vibrant dessert will wow your guests!"}]

        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);

        query.get(req.body.objectId)
            .then (async user => {
                console.log("still working from backend",JSON.stringify({[listName]:recipes}))
                user.add("userLists", {[listName]:recipes})
                user.save()
                console.log("hi from backend saved")
                let updated = await user.get("userLists")
                console.log("hi from backend updated")
                res.send({"updatedUserLists":updated})
            })
            .catch (e => next(e))
    } catch(error) {
        next(error)
    }
})

router.post('/create-event', async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

router.get('/objectId', async (req,res,next) => {
    try {
        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);
        query.equalTo("sub", req);
        query.find()
            .then (obj => res.send({"id":obj.id}))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

module.exports = router