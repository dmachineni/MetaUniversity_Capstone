const express = require('express');
const storage = require('../data/storage.js');
const router = express.Router()
const info = require('../models/recipes');
const axios = require('axios')

const Parse = require('parse/node')
Parse.initialize("WrhhT0n3PD3RkdESL6pAsvqN86YDNS9eP0v1VdZg", "WliFyOgGrffxxYv0IfvChkvx8a1ByDYKY7tadIDW")
Parse.serverURL = "https://parseapi.back4app.com"


router.get('/', async (req,res,next) => {
    try {
        let recipes = await info.getAllLists()
        // console.log('recipes',JSON.stringify(recipes))
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
                    const All_Recipes = Parse.Object.extend("AllRecipes");
                    const recipeObject = new All_Recipes();

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
        }
        res.status(200).send("success")

    } catch(error) {
        next(error)
    }
})

module.exports = router