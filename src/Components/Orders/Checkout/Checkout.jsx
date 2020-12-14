import React, { Component } from "react";
import { Button } from "reactstrap";

class Checkout extends Component {
    constructor(props){
        super(props)
        this.state = {
            values: {
              deleveryAddress: "",
              phone: null,
              paymentType: "Cash On Delivery",
            },
            
          };
          this.inputChangeHandenler=this.inputChangeHandenler.bind(this)
          this.submitHandler = this.submitHandler.bind(this)
          
    }

  goBack=()=>{
       this.props.history.goBack("/")
  }

  inputChangeHandenler=(event)=>{
      this.setState({
          values : {
              ...this.state.values,
              [event.target.name]:event.target.value
          }
      })

  }
  submitHandler=()=>{
      console.log("CheckOut --->",this.state.values);
      console.log("CheckOut --- this>",this);
  }

  render() {
    return (
      <div>
        <form>
          <textarea
            name="deleveryAddress"
            value={this.state.values.deleveryAddress}
            className="form-control"
            placeholder="Delivery Address"
            onChange={this.inputChangeHandenler}
          />
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            className="form-control"
            placeholder="Contact Number"
            onChange={this.inputChangeHandenler}
          />
          <br />
          <select
            name="paymentType"
            value={this.state.values.paymentType}
            className="form-control"
            onChange={this.inputChangeHandenler}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br />
          <Button style={{ backgroundColor: "#f55195" }} className="mr-auto" onClick={this.submitHandler}>
            {" "}
            Place Order
          </Button>
          <Button style={{ backgroundColor: "orange" }} className="ml-3" onClick={this.goBack}>
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default Checkout;
