import React, { Component } from "react";
import Burger from "./Burger/Burger.jsx";
import Controls from "../BurgerBuilder/Controls/Controls.jsx";

const INGREDIENT_PRICES = {
  salad: 15,
  cheese: 40,
  meat: 60,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { type: "salad", amount: 0 },
      { type: "cheese", amount: 0 },
      { type: "meat", amount: 0 },
    ],
    totalPrice: 40,
  };

  addIngredientHandle = (type) => {
    const ingredients = [...this.state.ingredients];

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    for (let item of ingredients) {
      if (item.type === type) {
        item.amount++;
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice,
    });
    console.log("Check  add---->", this.state);
  };

  removeIngredientHandle = (type) => {
    const ingredients = [...this.state.ingredients];

    for (let item of ingredients) {
      //console.log("BurgerBuilder.jsx-->************",item);
      if (item.type === type && item.amount > 0) {
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        item.amount--;
        this.setState({
          ingredients: ingredients,
          totalPrice: newPrice,
        });
      }
    }

    console.log("Check remove---->", this.state);
  };

  render() {
    return (
      <div className="d-flex flex-md-row flex-column">
        <Burger ingredients={this.state.ingredients} />
        <Controls
          addIngredient={this.addIngredientHandle}
          removeIngredient={this.removeIngredientHandle}
          totalPrice={this.state.totalPrice}
        />
      </div>
    );
  }
}
