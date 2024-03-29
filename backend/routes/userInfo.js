const express = require('express');
const router = express.Router()
const {google} = require('googleapis')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../auth-keys')
const axios = require('axios')

const Parse = require('parse/node');
const { time } = require('console');
Parse.initialize("WrhhT0n3PD3RkdESL6pAsvqN86YDNS9eP0v1VdZg", "WliFyOgGrffxxYv0IfvChkvx8a1ByDYKY7tadIDW")
Parse.serverURL = "https://parseapi.back4app.com"


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000',
)

async function verify(token) {
  const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload()
  const userid = payload['sub']
}

router.get('/get-tokens/:code', async (req,res,next) => {
    const {tokens} = await oauth2Client.getToken(req.params.code)
    res.send(tokens)
})

router.post('/create-tokens', async (req,res,next) => {
    try {
        const {code} = req.body
        const {tokens} = await oauth2Client.getToken(code)
        verify(tokens.id_token).catch((error) => console.log(error));

        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);
        let idTokenClaims = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokens.id_token}`)

        if (idTokenClaims.data.aud.includes(GOOGLE_CLIENT_ID)) {
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
        } else {
            res.send("not valid")
        }

       
    } catch (error) {
        {next(error)}
    }
})

router.post('/create-new-user-list', (req,res,next) => {
    try {
        const {listName} = req.body
        let recipes = req.body.recipes

        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);

        query.get(req.body.objectId)
            .then (async user => {
                user.add("userLists", {[listName]:recipes})
                user.save()
                let updated = await user.get("userLists")
                res.send({"updatedUserLists":updated})
            })
            .catch (e => next(e))
    } catch(error) {
        next(error)
    }
})

router.post('/add-recipe-to-user-list', (req,res,next) => {
    try {
        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);

        query.get(req.body.objectId)
            .then (async user => {
                let prev = await user.get("userLists")
                prev.map((list,i) => {
                    if(Object.keys(list)[0] === req.body.listName) {
                        prev[i][req.body.listName].push(req.body.recipe)
                    }
                })
                user.set("userLists", prev)
                user.save()

                let updated = await user.get("userLists")
                res.send({"updatedUserLists":updated})
            })
            .catch(e => next(e))
        
    } catch(error) {
        next(error)
    }
})

router.post('/create-event', async (req,res,next) => {
    try {
        const {summary,description,startDateTime, endDateTime,objectId,access_token} = req.body
        startDate = new Date(startDateTime)
        endDate = new Date(endDateTime)

        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const UserInfo = Parse.Object.extend("UserInfo");
        const query = new Parse.Query(UserInfo);
        query.get(objectId)
            .then(async user => {
                let refresh_token = await user.get("refreshToken")

                oauth2Client.setCredentials({access_token:access_token})
                const calendar = google.calendar({version:'v3', auth:'AIzaSyCJU2Ifa-LMAIPGHLwpOJT0ulu70qQgl8g'})

                const response = await calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    requestBody: {
                        summary:summary,
                        description:description,
                        location:"california",
                        colorId: '6',
                        start: {
                            dateTime: startDate.toISOString(),
                            timeZone:timezone
                        },
                        end: {
                            dateTime: endDate.toISOString(),
                            timeZone:timezone
                        }
                    }
                    
                })
                res.send(response)
            })
            .catch (error => {console.log(error);next(error)})

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