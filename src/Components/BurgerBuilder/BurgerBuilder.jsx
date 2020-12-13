import React, { Component } from "react";
import Burger from "./Burger/Burger.jsx";
import Controls from "../BurgerBuilder/Controls/Controls.jsx";
import Summary from "./Summary/Summary.jsx";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

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
    modalOpen: false,
    purchasable : false,
  };


  updatePurchasable = ingredients =>{
    // var sum = 0
    // for (let item of ingredients){
    //   sum += item.amount
    // }
    //console.log("^^^^^",sum);
    // *** Alternate Way below : ** :
    const sum = ingredients.reduce((sum,element)=>{    // see documentation for know about javaScript reduce() function.
      return sum+element.amount  
    },0);
    //console.log("^^^^^",sum);
    this.setState({
      purchasable : sum>0,
    })
  }

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
    //console.log("Check  add---->", this.state);
    this.updatePurchasable(ingredients)
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

    //console.log("Check remove---->", this.state);
    this.updatePurchasable(ingredients)
  };

  toggleModal = () =>{
    this.setState({
      modalOpen : !this.state.modalOpen
    })
  }

  handleCheckout = () =>{
    this.props.history.push("/checkout")
  }

  componentDidMount(){
    console.log("BurgerBuilder.jsx--->",this.props);
    
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.state.ingredients} />
          <Controls
            ingredients={this.state.ingredients}
            addIngredient={this.addIngredientHandle}
            removeIngredient={this.removeIngredientHandle}
            totalPrice={this.state.totalPrice}
            toggleModal = {this.toggleModal}
            purchasable = {this.state.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h6>
              <i>Total Price : {this.state.totalPrice} BDT only</i>
            </h6>
            <Summary ingredients={this.state.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleCheckout}>Continue To Checkout </Button>
            <Button color="warning" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
