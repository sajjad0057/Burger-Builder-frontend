import React from "react";


const Order =(props)=>{
    //console.log("single order.js--->",props);
    const ingredient_obj = props.order.ingredients;
    const ingredients = []
    for (let [key,value] of Object.entries(ingredient_obj)){
        ingredients.push({type:key,amount:value})
    }
    const ingredientSummery=ingredients.map(item=>{
        return(
            <span key={item.type}
            style={{
                border:"1px solid grey",
                borderRadius:"5px",
                margin:"6px",
                padding:"2px"
            }}> {item.amount} x <span style={{textTransform:"capitalize"}}>{item.type}</span></span>
        )
    })
    return(
        <div style={{
            border:"1px solid grey",
            borderRadius:"5px",
            margin:"2px",
            padding:"20px",
            boxShadow:"1px 1px #888888",
            }}>
            <p>Order Number : {props.order.id} </p>
            <p>Delivery Address : {props.order.customer.deliveryAddress}</p>
            <hr/>
            <i>Summery : </i>
            {ingredientSummery}
            <hr/>
            <i>Total Price : {props.order.price} BDT</i>
            <br/>
            Order time : {props.order.orderTime}
        </div>
    )
}


export default Order;