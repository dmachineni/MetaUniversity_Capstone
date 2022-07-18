import "./ListCard.css"
import * as React from "react"
import { Link } from "react-router-dom"

export default function ListCard(props) {
    return (
      // <div className="product-card">
        
      //   <Link className = "product-img" to={`/products/${props.product.id}`}>
      //     <img className="img" src={props.product.image}></img>  
      //   </Link>
  
      //   <p className = "product-name" >
      //       {props.product.name}
      //   </p>
  
      //   <p className = "product-price"> 
      //       $ {props.product.price?.toFixed(2)}
      //   </p>
  
  
      //     <p className={props.showDescription ? "product-description":"product-description hidden"}>
      //       {props.product.description}
      //     </p>

        
  
      //   <button className="add" onClick={()=>props.handleAddItemToCart(props.product.id)}>+</button>
  
      //   <button className="remove" onClick={
      //     ()=>props.handleRemoveItemFromCart(props.product.id)}>-</button>
  
      //   <div className="product-quantity">
      //     {(props.quantity === 0 || props.quantity === undefined) ? "":props.quantity}
      //     ternary: (conditions) ?(if) true do this:false do this
  
      //   </div>
      // </div>

      <div className="list-card">
        {/* add pic, after the list name */}
        {console.log("check", props.category, props.subCat, props.subCatRecipes[0]["thumbnail_url"])}
        <Link onClick={props.handleListDetails(props.category, props.subCat)} className = "product-img" to={`/list/${props.category}/${props.subCat}`}>
          <img className="img" src={props.subCatRecipes[0]["thumbnail_url"]}></img>  
        </Link>

        <p className = "list-name" >
          {props.subCat}
        </p>

      </div>
    )
}