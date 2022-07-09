// const { all } = require("../app.js");
const e = require("express");
const { add } = require("lodash");
const { all } = require("../app.js");
const {storage} = require("../data/storage.js");
const {BadRequestError } = require("../utils/errors.js");

class Recipes {
    static getAllLists(categories, subCategories) {       
        let toReturn = {"all lists": {}}
        categories.forEach(category => {
            let allCatRecipes = this.getCategoryRecipes(category);
            let allSubCatRecipes = this.getSubCategoryRecipes(allCatRecipes, subCategories)
            toReturn["all lists"][category] = allSubCatRecipes["subcategory recipes"]
        })

        return toReturn
    }

    static getCategoryRecipes(category) {
        let allRecipes = storage.get('results')
        
        let toReturn = {"category recipes": []}

        allRecipes.forEach(recipe => {
            Object.values(recipe.tags).forEach(val => {
                if(val.name === category) {
                    toReturn["category recipes"].push(recipe)
                    //how to break out of here?
                }
            })
        })

        return toReturn;
    }
    
    //recipes is a list of objects
    static getSubCategoryRecipes(recipes, subCategories) {
        let toReturn = {"subcategory recipes": []}
        subCategories.forEach(subCat => {
            let toAdd = {};
            toAdd[subCat] = []
            recipes["category recipes"].forEach(r => {
                r["tags"].forEach(tag => {
                    if(tag.name.toLowerCase() === subCat) {  //how to test whether tag.name and tag.type exists
                        toAdd[subCat].push(r)
                    } else if (tag.type.toLowerCase() === subCat) {
                        toAdd[subCat].push(r)
                    } else if (tag.display_name.toLowerCase() === subCat) {
                        toAdd[subCat].push(r)
                    }
                })
            })
            toReturn["subcategory recipes"].push(toAdd)
        })
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