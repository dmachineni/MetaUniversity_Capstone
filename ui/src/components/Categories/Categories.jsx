// import "./Categories.css"
// import * as React from "react"
// import ListGrid from "../ListGrid/ListGrid"

// export default function Categories(props) {
//     return (
//         <div className="categories-list">
//             {props.categories.map((category) => {
//                 // console.log('cat: ', props.categorizedRecipes)
//                 return (
//                     <div className="category-info">
//                         {/* <div className="category-name">
//                             {category}
//                         <div/> */}
//                         <h2>{category.toUpperCase()}</h2>
//                         <ListGrid category= {category}categoryRecipes = {props.categorizedRecipes[category]} subCategories={props.subCategories}/>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }


import "./Categories.css"
import * as React from "react"
import ListGrid from "../ListGrid/ListGrid"

export default function Categories(props) {
    console.log(props.categorizedRecipes)
    let categories = Object.keys(props.categorizedRecipes)
    console.log('hi', categories)

    return (
        <div className="categories-list">
            {categories.map((category,idx) => {
                console.log('cat: ',props.categorizedRecipes[categories[idx]])
                return (
                    <div className="category-info">
                        {/* <div className="category-name">
                            {category}
                        </div> */}
                        <h2>{category.toUpperCase()}</h2>
                        <ListGrid category= {category} categoryRecipes = {props.categorizedRecipes[categories[idx]]} subCategories={props.subCategories}/>
                    </div>
                )
            })}
        </div>
    )
}