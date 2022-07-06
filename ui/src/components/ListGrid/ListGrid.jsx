
import "./ListGrid.css"
import ListCard from "../ListCard/ListCard"
import React from 'react';


export default function ProductGrid(props) {
    return (
      // <div className="product-grid">
      //   {props.products.map((product, idx) => {
      //     let q = 0;
      //     let obj =  props.shoppingCart.find((item) => product.id == item.itemId);
      //     if(obj != undefined) {
      //       q = obj.quantity;
      //     }
  
      //     return (<ProductCard key={idx} product={product} showDescription={false} quantity={q}
      //       productId = {product.itemId} handleAddItemToCart={props.handleAddItemToCart} 
      //       handleRemoveItemFromCart={props.handleRemoveItemFromCart}
      //       />)
      //   }) }
      // </div>
      <div className="list-grid">Hi</div>
    )
}