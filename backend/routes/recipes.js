const express = require('express');
const storage = require('../data/storage.js');
const router = express.Router()
const info = require('../models/recipes');
const axios = require('axios')

const Parse = require('parse/node');
const { Component } = require('react');
Parse.initialize("WrhhT0n3PD3RkdESL6pAsvqN86YDNS9eP0v1VdZg", "WliFyOgGrffxxYv0IfvChkvx8a1ByDYKY7tadIDW")
Parse.serverURL = "https://parseapi.back4app.com"

const milkAllergenIngredients = [
    "Acidophilus Milk",
    "Ammonium Caseinate",
    "Butter",
    "Butter Esters",
    "Butter Fat",
    "Butter Oil",
    "Butter Solids",
    "Buttermilk",
    "Buttermilk Powder",
    "Calcium Caseinate",
    "Casein",
    "Caseinate",
    "Cheese",
    "Condensed Milk",
    "Cottage Cheese",
    "Cream",
    "Curds",
    "Delactosed Whey",
    "Demineralized Whey",
    "Dry Milk Powder",
    "Dry Milk Solids",
    "Evaporated Milk",
    "Ghee",
    "Goat Cheese",
    "Goat Milk",
    "Half & Half",
    "Hydrolyzed Casein",
    "Hydrolyzed Milk Protein",
    "Iron Caseinate",
    "Lactalbumin",
    "Lactoferrin",
    "Lactoglobulin",
    "Lactose",
    "Lactulose",
    "Low-Fat Milk",
    "Magnesium Caseinate",
    "Malted Milk",
    "Milk",
    "Milk Derivative",
    "Milk Fat",
    "Milk Powder",
    "Milk Protein",
    "Milk Solids",
    "Natural Butter Flavor",
    "Nonfat Milk",
    "Nougat",
    "Paneer",
    "Potassium Caseinate",
    "Recaldent",
    "Rennet Casein",
    "Sheep Milk",
    "Sheep Milk Cheese",
    "Skim Milk",
    "Sodium Caseinate",
    "Sour Cream",
    "Sour Milk Solids",
    "Sweetened Condensed Milk",
    "Sweet Whey",
    "Whey",
    "Whey Powder",
    "Whey Protein Concentrate",
    "Whey Protein Hydrolysate",
    "Whipped Cream",
    "Whipped Topping",
    "Whole Milk",
    "Yogurt",
    "Zinc Caseinate",
    "milkshakes",
    "eggnog",
    "ice cream",
    "cream cheese"
]
const glutenAllergenIngredients = []
const soyAllergenIngredients = []
const eggsAllergenIngredients = []
const nutsAllergenIngredients = []

const listOfAllergens = ["milk"]
const allergenIngredients = [milkAllergenIngredients]

//recursive function to check if the value is contained in the array
function checkVal(array, value) {
    return array.some(function(entry) {
        if (Array.isArray(entry)) {
            return checkVal(entry, value);
        }
        let entryLowerCase = entry.toLowerCase()
        return (entryLowerCase.includes(value) || value.includes(entryLowerCase));
    })
}


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
                    recipes.map((r,idx) => {
                        if (r.recipes) {
                            return null
                        }

                        const AllRecipes = Parse.Object.extend("AllRecipes");
                        const recipeObject = new AllRecipes();

                        let ingredients = []
                        let ingredientsWithMeasurements = []

                        r["sections"].map((component) => {
                            component["components"].map((ingredient) => {
                                ingredientsWithMeasurements.push(ingredient["raw_text"])
                                ingredients.push(ingredient["ingredient"]["name"])
                            })
                        })

                        let allergensInRecipe = []
                        ingredients.map(i => {
                            allergenIngredients.map((allergen,idx) => {
                                if (checkVal(allergen, i.toLowerCase()) && !allergensInRecipe.includes(listOfAllergens[idx])) {
                                    allergensInRecipe.push(listOfAllergens[idx])
                                }
                            })
                        })

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

                        recipeObject.set("ingredients", ingredientsWithMeasurements)        
                        recipeObject.set("allergens", allergensInRecipe)        

                        recipeObject.save()
                            .catch(error => next(error))
                    }) 
                    res.status(200).send("success")
                })
                .catch(e => next(e))
        }
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