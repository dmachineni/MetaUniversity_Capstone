// const { all } = require("../app.js");
const e = require("express");
const { all } = require("../app.js");
const {storage} = require("../data/storage.js");
const {BadRequestError } = require("../utils/errors.js");

class Recipes {
    static getAllLists(categories, subCategories) {       
        let toReturn = {"all lists": []}
        categories.forEach(category => {
            let allCatRecipes = this.getCategoryRecipes(category);
            let allSubCatRecipes = this.getSubCategoryRecipes(allCatRecipes, subCategories)
            console.log("")
            console.log("allsub", allSubCatRecipes)
            toReturn["all lists"][category] = allSubCatRecipes["subcategory recipes"]
            console.log("")
        console.log("toreturn", toReturn["all lists"]["brunch"]["under 30 minutes"])
        })
        
        console.log("")
        

        return toReturn
    }

    static getCategoryRecipes(category) {
        //let allRecipes = storage.get('results')
        let allRecipes = [
            {
                "slug": "how-to-make-classic-french-toast",
                "thumbnail_url": "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/341495.jpg",
                "total_time_tier": {
                  "tier": "under_30_minutes",
                  "display_tier": "Under 30 minutes"
                },
                "tags": [
                  {
                    "name": "stove_top",
                    "id": 65848,
                    "display_name": "Stove Top",
                    "type": "appliance"
                  },
                  {
                    "name": "liquid_measuring_cup",
                    "id": 1280506,
                    "display_name": "Liquid Measuring Cup",
                    "type": "equipment"
                  },
                  {
                    "id": 64444,
                    "display_name": "American",
                    "type": "cuisine",
                    "name": "american"
                  },
                  {
                    "name": "big_batch",
                    "id": 65851,
                    "display_name": "Big Batch",
                    "type": "dish_style"
                  },
                  {
                    "name": "mixing_bowl",
                    "id": 1280510,
                    "display_name": "Mixing Bowl",
                    "type": "equipment"
                  },
                  {
                    "type": "difficulty",
                    "name": "under_30_minutes",
                    "id": 64472,
                    "display_name": "Under 30 Minutes"
                  },
                  {
                    "display_name": "Comfort Food",
                    "type": "dietary",
                    "name": "comfort_food",
                    "id": 64462
                  },
                  {
                    "name": "measuring_spoons",
                    "id": 1280508,
                    "display_name": "Measuring Spoons",
                    "type": "equipment"
                  },
                  {
                    "name": "mothers_day",
                    "id": 6854262,
                    "display_name": "Mother's Day",
                    "type": "holiday"
                  },
                  {
                    "name": "breakfast",
                    "id": 64483,
                    "display_name": "Breakfast",
                    "type": "meal"
                  },
                  {
                    "id": 64484,
                    "display_name": "Brunch",
                    "type": "occasion",
                    "name": "brunch"
                  },
                  {
                    "id": 1247785,
                    "display_name": "Pyrex",
                    "type": "equipment",
                    "name": "pyrex"
                  },
                  {
                    "name": "whisk",
                    "id": 1247793,
                    "display_name": "Whisk",
                    "type": "equipment"
                  },
                  {
                    "name": "tongs",
                    "id": 1247790,
                    "display_name": "Tongs",
                    "type": "equipment"
                  },
                  {
                    "name": "valentines_day",
                    "id": 64480,
                    "display_name": "Valentine's Day",
                    "type": "holiday"
                  },
                  {
                    "name": "spatula",
                    "id": 1247788,
                    "display_name": "Spatula",
                    "type": "equipment"
                  }
                ]
            }
        ]

        
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
                        // console.log("r", r)
                        toAdd[subCat].push(r)
                    } else if (tag.type.toLowerCase() === subCat) {
                        // console.log("r", r)
                        toAdd[subCat].push(r)
                    } else if (tag.display_name.toLowerCase() === subCat) {
                        console.log("r", r)
                        toAdd[subCat].push(r)
                    }
                })
            })
            console.log('toadd',toAdd)
            toReturn["subcategory recipes"].push(toAdd)
            console.log("toR", toReturn["subcategory recipes"])
            console.log("toR", toReturn["subcategory recipes"]["under 30 minutes"])
        })
        return toReturn
    }

}

module.exports = Recipes