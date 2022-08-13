const express = require("express");
const { add } = require("lodash");
const { all } = require("../app.js");
const {storage} = require("../data/storage.js");
const {BadRequestError } = require("../utils/errors.js");
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('../auth-keys')

const Parse = require('parse/node')
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

let parseQuery

class Recipes {

    /* returns all recipes sorted by categories and subcategories in a JSON object of arrays
      retrieves all recipes (parse objects) from class 'AllRecipes' and calls 2 helper functions for each category*/
    static async getAllLists() {
      parseQuery = new Parse.Query('AllRecipes')
      parseQuery.descending('createdAt')

      let recipeIds = []
      await parseQuery.find().then((result) => {
        result.forEach((id) => {
          recipeIds.push(id.id)
        })
      })

      let categories = ["brunch", "lunch", "desserts"]
      let subCategories = ["under 30 minutes","comfort food","dairy-free","vegetarian", "easy", "italian", "american"] 

      let toReturn = {"all lists": {}}
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i]
        let allCatRecipeIds = await this.getCategoryRecipes(category,recipeIds);
        let allSubCatRecipesIds = await this.getSubCategoryRecipes(allCatRecipeIds, subCategories)
        toReturn["all lists"][category] = allSubCatRecipesIds["subcategory recipes"]
      }
      return toReturn
    }

    /* params: category and a list of recipe (parse object) ids from parse class
       returns: array of recipe (parse object) ids
       loops through all recipes to find recipes that have matching tags and category names
     */
    static async getCategoryRecipes(category, recipeIds) {
        let toReturn = []

        for (let i = 0; i < recipeIds.length; i++) {
          let id = recipeIds[i]
          let queryObj = await parseQuery.get(id)
          let tags = await queryObj.get("tags")
          Object.values(tags).forEach(val => {
              if(val.name === category) {
                toReturn.push(id)
              }
          })
        }

        return toReturn;
    }
    
    /* params: subCategories and a list of recipe (parse object) ids for a specific category
       returns: array of JSON objects containing subCategory and array of correlating recipe (parse object) ids
       loops through given recipes to find recipes that have matching tags and subCategory names
     */
    static async getSubCategoryRecipes(recipeIds, subCategories) {
        let toReturn = {"subcategory recipes": []}

        for (let i = 0; i < subCategories.length; i++) {
          let subCat = subCategories[i]
          let toAdd = {};
          toAdd[subCat] = []

          for (let j = 0; j < recipeIds.length; j++) {
            let id = recipeIds[j]
            let parseObj = await parseQuery.get(id)
            let tags = await parseObj.get("tags")
            let matched = false

            tags.map(async tag => {
              if(!matched) {
                if(tag.name.toLowerCase() === subCat) {  
                  matched = true
                } else if (tag.type.toLowerCase() === subCat) {
                  matched = true
                } else if (tag.display_name.toLowerCase() === subCat) {
                  matched = true
                }
  
                if(matched) {
                  let name = await parseObj.get("name")
                  let pic = await parseObj.get("thumbnailUrl")
                  let description = await parseObj.get("description")
                  let totalTimeTier = await parseObj.get("totalTimeTier")
                  let totalTimeMinutes = await parseObj.get("totalTimeMinutes")
                  let instructions = await parseObj.get("instructions")
                  let videoUrl = await parseObj.get("videoUrl")
                  let ingredientsInfo = await parseObj.get("ingredientsInfo")
                  let allergens = await parseObj.get("allergens")
                  let ingredients = await parseObj.get("ingredients")
                  let nutrition = await parseObj.get("nutrition")

                  let obj = {
                    id:id,
                    name:name,
                    thumbnail_url:pic,
                    description:description,
                    totalTimeTier:totalTimeTier,
                    totalTimeMinutes:totalTimeMinutes,
                    instructions:instructions,
                    videoUrl:videoUrl,
                    ingredientsInfo:ingredientsInfo,
                    allergens:allergens,
                    ingredients:ingredients,
                    nutrition:nutrition
                  }
                  toAdd[subCat].push(obj)
                }
              } 
            })
          }
          toReturn["subcategory recipes"].push(toAdd)
        }
        return toReturn
    }

    static modifyCategories(addCategories, addSubCategories) {
      if(addCategories !== undefined && addCategories.length >= 1) {
        addCategories.forEach(newCat => {
          storage.add('categories',newCat)
        })
      }

      if(addSubCategories !== undefined && addSubCategories.length >= 1) {
        addSubCategories.forEach(newCat => {
          storage.add('categories',newCat)
        })
      }
      return {"categories": storage.get('categories'), "subcategories": storage.get('subCategories')}
    }
}

module.exports = Recipes