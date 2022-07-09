const express = require('express')
const router = express.Router()
const info = require('../models/recipes');

let categories = ["brunch"]
let subCategories = ["under 30 minutes"]

router.get('/', (req,res,next) => {
    try {
        let recipes = info.getAllLists(categories, subCategories) //fix the req part after models is done
        res.status(200).send({"categorized lists:":recipes}) 
    } catch (error) {
        next(error)
    }
})

router.post('/',(req,res,next) => {
    try {
        let categories = store.modifyCategories(req.body.categories, req.body.subCategories)
        res.status(200).send({"categories": categories})
    } catch (error) {
        next(error)
    }
})

module.exports = router