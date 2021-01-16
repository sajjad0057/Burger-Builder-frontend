import React, { Component } from "react";
import Spinner from "../../Spinner/Spinner.js";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { resetIngredients } from "../../../redux/actionCreators.js";
import { Formik } from "formik";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class Checkout extends Component {
  state = {
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

  submitHandler = (values) => {
    this.setState({
      isLoading: true,
    });

    const ingredients_copy = [...this.props.ingredients]
    const ingredients_obj = {}
    for (let i of ingredients_copy){
      ingredients_obj[i.type]=i.amount
    }
    const order = {
      ingredients: ingredients_obj,
      customer: values,
      price: this.props.totalPrice,
      orderTime: new Date().toLocaleString(),
      user : this.props.userId,
    };
    const header = {
      headers : {
        "Content-Type" :" application/json",
        "Authorization" : `Bearer ${this.props.token}`,
      }
    }

    axios
      .post("http://127.0.0.1:8000/api/order/",order,header)
      .then((response) => {
        // in DRF 201 is success code
        if (response.status === 201) {
          this.setState({
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
        console.log("err--->",err.response);
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
        <Formik
          initialValues={{
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
          }}
          onSubmit={(values) => {
            this.submitHandler(values);
            console.log("Checkout forms values :", values);
          }}
          validate={(values) => {
            const errors = {};
            if (!values.deliveryAddress) {
              errors.deliveryAddress = "Required";
            }
            if (!values.phone) {
              errors.phone = "Required";
            } else if (
              !/(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(values.phone)
            ) {
              errors.phone = "Invalid Number";
            }
            console.log(errors);
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, touched, errors }) => (
            <form
              style={{
                border: "1px solid #f0eee9",
                boxShadow: "1px 1px #dbd9d5",
                borderRadius: "5px",
                padding: "20px",
              }}
              onSubmit={handleSubmit}
            >
              <textarea
                name="deliveryAddress"
                value={values.deliveryAddress}
                className="form-control"
                placeholder="Delivery Address"
                onChange={handleChange}
              />
              <span style={{ color: "orange" }}>{errors.deliveryAddress}</span>
              <br />
              <input
                name="phone"
                value={values.phone}
                className="form-control"
                placeholder="Contact Number"
                onChange={handleChange}
              />
              <span style={{ color: "orange" }}>{errors.phone}</span>
              <br />
              <select
                name="paymentType"
                value={values.paymentType}
                className="form-control"
                onChange={handleChange}
              >
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Bkash">Bkash</option>
              </select>
              <br />
              <Button
                type="submit"
                style={{ backgroundColor: "#f55195" }}
                className="mr-auto"
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
          )}
        </Formik>
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
