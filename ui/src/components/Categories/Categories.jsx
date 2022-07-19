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
    // console.log(props.categoredefccivtutfkgdngleerfttlndbnnleizedRecipes)
    let categories = Object.keys(props.categorizedRecipes)
    console.log('hi', props.categorizedRecipes)

    return (
        <div className="categories-list">
            {categories.map((category, idx) => {
                // console.log('categories', category, props.categorizedRecipes[category])
                // console.log()
                return(
                    <div className="category-info" key={idx}>
                        {/* {console.log("hi")} */}
                        <h2>{category.toUpperCase()}</h2>
                        <ListGrid category= {category} categoryRecipes = {props.categorizedRecipes[category]} 
                            subCategories={props.subCategories} handleListDetails={props.handleListDetails}/>
                    </div>
                )
            })}
        </div>
    )
}