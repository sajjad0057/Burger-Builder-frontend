import React, { Component } from "react";
import Spinner from "../../Spinner/Spinner.js";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { resetIngredients } from "../../../redux/actionCreators.js";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
    orderedSuccess: false,
  };

  goBack = () => {
    this.props.history.goBack("/");
  };

  stayInPage = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  inputChangeHandenler = (event) => {
    this.setState((state) => ({
      // this is recommended and correct for using setState() func.
      values: {
        ...state.values,
        [event.target.name]: event.target.value,
      },
    }));
  };
  submitHandler = () => {
    this.setState({
      isLoading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
    };
    axios
      .post(
        "https://burgerbuilder-308a8-default-rtdb.firebaseio.com/orders.json",
        order
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            values: {
              deliveryAddress: "",
              phone: "",
              paymentType: "Cash On Delivery",
            },
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Thanks ! Your order placed successfully.",
            orderedSuccess: true,
          });
          this.props.resetIngredients();
          //console.log("response.status === 200 called!");
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Oops ! Something went wrong , try again.",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: `${err.message} ! please Try again .`,
        });
        //console.log(err);
      });

    //console.log("CheckOut --->", this.state.isLoading);
  };

  render() {
    let form = (
      <div>
        <h4
          style={{
            color: "#696969",
            border: "1px solid #f0eee9",
            boxShadow: "1px 1px #dbd9d5",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          Payment : {this.props.totalPrice} BDT only{" "}
        </h4>

        <form
          style={{
            border: "1px solid #f0eee9",
            boxShadow: "1px 1px #dbd9d5",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            className="form-control"
            placeholder="Delivery Address"
            onChange={(e) => this.inputChangeHandenler(e)}
          />
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            className="form-control"
            placeholder="Contact Number"
            onChange={(e) => this.inputChangeHandenler(e)}
          />
          <br />
          <select
            name="paymentType"
            value={this.state.values.paymentType}
            className="form-control"
            onChange={(e) => this.inputChangeHandenler(e)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#f55195" }}
            className="mr-auto"
            onClick={this.submitHandler}
            disabled={!this.props.purchasable}
          >
            Place Order
          </Button>
          <Button
            style={{ backgroundColor: "orange" }}
            className="ml-3"
            onClick={this.goBack}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#f55195" }}
              onClick={
                this.state.orderedSuccess ? this.goBack : this.stayInPage
              }
            >
              Go back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
