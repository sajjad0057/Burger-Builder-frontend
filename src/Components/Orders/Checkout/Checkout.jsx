import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";


const mapStateToProps = state =>{
    return{
        ingredients : state.ingredients,
        totalPrice : state.totalPrice,

    }
}

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
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
      const order = {
          ingredients : this.props.ingredients,
          customer : this.state.values,
          price : this.props.totalPrice,
          orderTime : new Date(),

      }
      axios.post("https://burgerbuilder-308a8-default-rtdb.firebaseio.com/orders.json",order)
      .then(response=>console.log(response))
      .catch(err=>console.log(err))            
       console.log("CheckOut --->", order);


  };

  render() {
    return (
      <div>
          <h4 style={{
            color : "#696969",
            border :"1px solid #f0eee9",
            boxShadow :"1px 1px #dbd9d5",
            borderRadius : "5px",
            padding : "20px"
        }}>Payment : {this.props.totalPrice}  BDT only </h4>

        <form style={{
            border :"1px solid #f0eee9",
            boxShadow :"1px 1px #dbd9d5",
            borderRadius : "5px",
            padding : "20px"
        }}>
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
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

export default connect(mapStateToProps) (Checkout);
