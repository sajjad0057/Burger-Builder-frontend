import React, {Component}from "react";
import Header from "./Header/Header.jsx";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.jsx";
import Orders from "./Orders/Orders.jsx";
import Checkout from "./Orders/Checkout/Checkout.jsx";
import { Route, Switch,Redirect } from "react-router-dom"; // we can aslo import {Route } from "react-router" , But it's recommended to import { Route } from "react-router-dom",
import Auth from "./Auth/Auth.js";
import Logout from "./Auth/Logout.js";
import { authCheck } from "../redux/authActionCreators.js";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    authCheck : ()=>dispatch(authCheck())
  }
}

class Main extends Component{

  componentDidMount(){
    this.props.authCheck()
  }
  render(){
    let routes = null;
    if (this.props.token === null) {
      routes = (
        <Switch>
          <Route path="/login" component={Auth} />
          <Redirect to="/login" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />   
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div>
        <Header />
        <div className="container">{routes}</div>
      </div>
    );

  }


};

export default connect(mapStateToProps,mapDispatchToProps)(Main);
