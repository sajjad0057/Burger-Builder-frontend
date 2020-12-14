import React, { Component } from "react";
import Burger from "./Burger/Burger.jsx";
import Controls from "../BurgerBuilder/Controls/Controls.jsx";
import Summary from "./Summary/Summary.jsx";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  updatePurchasable,
} from "../../redux/actionCreators.js";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
    updatePurchasable: () => dispatch(updatePurchasable()),
  };
};

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  addIngredientHandle = (type) => {
    this.props.addIngredient(type);
    this.props.updatePurchasable();
  };

  removeIngredientHandle = (type) => {
    this.props.removeIngredient(type)
    this.props.updatePurchasable();
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  handleCheckout = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    console.log("BurgerBuilder.jsx--->", this.props);
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls
            ingredients={this.props.ingredients}
            addIngredient={this.addIngredientHandle}
            removeIngredient={this.removeIngredientHandle}
            totalPrice={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h6>
              <i>Total Price : {this.props.totalPrice} BDT only</i>
            </h6>
            <Summary ingredients={this.props.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button style={{backgroundColor:"#f55195"}} onClick={this.handleCheckout}>
              Continue To Checkout
            </Button>
            <Button color="warning" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
