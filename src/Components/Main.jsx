import React from "react";
import Header from "./Header/Header.jsx";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.jsx";
import Orders from "./Orders/Orders.jsx";
import Checkout from "./Orders/Checkout/Checkout.jsx";
import { Route } from "react-router-dom";  // we can aslo import {Route } from "react-router" , But it's recommended to import { Route } from "react-router-dom", 

const Main = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Route path="/orders" component = {Orders} />
        <Route path="/checkout" component= {Checkout} />
        <Route path="/" exact component = {BurgerBuilder} />
      </div>

    </div>
  );
};

export default Main;
