const express = require('express');
const storage = require('../data/storage.js');
const router = express.Router()
const info = require('../models/recipes');
const axios = require('axios')
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('../auth-keys')

const Parse = require('parse/node')
Parse.initialize(PARSE_APP_ID,PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"


router.get('/', async (req,res,next) => {
    try {
        let recipes = await info.getAllLists()
        res.status(200).send(recipes) 
    } catch (error) {
        next(error)
    }
})

router.post('/',(req,res,next) => {
    try {
        let categories = storage.modifyCategories(req.body.categories, req.body.subCategories)
        res.status(200).send({"categories": categories, "sub categories": subCategories})
    } catch (error) {
        next(error)
    }
})

router.get('/allrecipes', (req,res,next)  =>  {
    try {
        for (let i = 0; i < 40; i += 40) {
            const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {from: i, size: '40'},
            headers: {
                'X-RapidAPI-Key': '7b786f7924mshabfbd2ef083fab3p1abfffjsn166b0fa4b555',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
            };

            axios.request(options)
                .then(function (response) {
                    let recipes = response.data["results"]
                    //adding recipe to database
                    recipes.map((r) => {
                        const AllRecipes = Parse.Object.extend("AllRecipes");
                        const recipeObject = new AllRecipes();

                        recipeObject.set("name", r.name)
                        recipeObject.set("thumbnailUrl", r["thumbnail_url"])
                        recipeObject.set("totalTimeTier", r["total_time_tier"])
                        recipeObject.set("totalTimeMinutes", r["total_time_minutes"]) 
                        recipeObject.set("tags", r["tags"])
                        if (r["description"] === undefined) {
                            recipeObject.set("description", "")
                        } else {
                            recipeObject.set("description", r["description"])
                        }
                        if (r["description"] === undefined) {
                            recipeObject.set("videoUrl", r["original_video_url"])
                        } else {
                            recipeObject.set("videoUrl", r["video_url"])
                        }
                        recipeObject.set("recipeId", r["id"])
                        recipeObject.set("nutrition", r["nutrition"])
                        recipeObject.set("instructions", r["instructions"])
                        recipeObject.set("ingredientsInfo", r["sections"])


                        recipeObject.save()
                            .catch(error => next(error))
                    }) 
                })
                .catch(e => next(e))
        }
        res.status(200).send("success")

    } catch(error) {
        next(error)
    }
})

router.get('/search/:searchInput', (req,res,next) => {
    try {
        const AllRecipes = Parse.Object.extend("AllRecipes");
        const query = new Parse.Query(AllRecipes);
        query.fullText('name', req.params.searchInput);
        query.find()
            .then (recipes=>{
                res.send({recipes:recipes})
            })
            .catch (e => next(e))

    } catch(e) {
        next(e)
    }
})

module.exports = router