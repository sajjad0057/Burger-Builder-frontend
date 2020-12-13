import React from "react";


const Summary = props =>{
    //console.log(props);
    const {ingredients}=props
    const ingredientsSummary = ingredients.map(item=>{
        return(
            <li key={item.type}>
                <span style={{textTransform:"capitalize"}}>{item.type}</span> x {item.amount}
            </li>
        )
    })
    return(
        <div>
            <ul>
                {ingredientsSummary}
            </ul>
        </div>
    )
}


export default Summary;