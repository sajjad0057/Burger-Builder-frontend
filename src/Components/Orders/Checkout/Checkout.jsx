import React, { Component } from "react";
import { Button } from "reactstrap";

class Checkout extends Component {
  state = {
    values: {
      deleveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
  };

  goBack = () => {
    this.props.history.goBack("/");
  };

  inputChangeHandenler = (event) => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value,
      },
    });
  };
  submitHandler = () => {
    console.log("CheckOut --->", this.state.values);
    this.setState({
        values:{
            deleveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        }
    })

  };

  render() {
    return (
      <div>
        <form>
          <textarea
            name="deleveryAddress"
            value={this.state.values.deleveryAddress}
            className="form-control"
            placeholder="Delivery Address"
            onChange={(e)=>this.inputChangeHandenler(e)}
          />
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            className="form-control"
            placeholder="Contact Number"
            onChange={(e)=>this.inputChangeHandenler(e)}
          />
          <br />
          <select
            name="paymentType"
            value={this.state.values.paymentType}
            className="form-control"
            onChange={(e)=>this.inputChangeHandenler(e)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#f55195" }}
            className="mr-auto"
            onClick={this.submitHandler}
          >
            {" "}
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
  }
}

export default Checkout;
