import React, { Component } from "react";
import Burger from "./Burger/Burger.jsx";
import Controls from "../BurgerBuilder/Controls/Controls.jsx"



export default class BurgerBuilder extends Component {

  state = {
    ingredients : [
      {type : 'salad' , amount : 0},
      { type : 'cheese', amount : 0 },
      {type : 'meat', amount : 0}
    ]
  }

  addIngredientHandle = type =>{
    const ingredients = [...this.state.ingredients]
    //console.log("Check ---->",ingredients);
    for (let item of ingredients){
      if (item.type===type){
        item.amount++;
      }

    }
    this.setState({
      ingredients : ingredients
    })
  }

  removeIngredientHandle = type =>{
    const ingredients = [...this.state.ingredients]
    console.log("Check ---->",ingredients);
    for (let item of ingredients){
      if (item.type===type && item.amount>0){
        item.amount--;
      }

    }
    this.setState({
      ingredients : ingredients
    })
  }


  render() {
    return (
      <div className="d-flex flex-md-row flex-column">
        <Burger ingredients={this.state.ingredients}/>
        <Controls
        addIngredient = {this.addIngredientHandle}
        removeIngredient = {this.removeIngredientHandle}
        />
      </div>
    );
  }
}
