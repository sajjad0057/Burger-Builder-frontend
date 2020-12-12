import React, { Component } from "react";
import Burger from "./Burger/Burger.jsx";
import Controls from "../BurgerBuilder/Controls/Controls.jsx"



export default class BurgerBuilder extends Component {

  state = {
    ingredients : [
      {type : 'salad' , amount : 1},
      { type : 'cheese', amount : 1 },
      {type : 'meat', amount : 2}
    ]
  }


  render() {
    return (
      <div className="d-flex flex-md-row flex-column">
        <Burger ingredients={this.state.ingredients}/>
        <Controls/>
      </div>
    );
  }
}
