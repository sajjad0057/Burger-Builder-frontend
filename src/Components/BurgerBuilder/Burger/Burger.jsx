import React from "react";
import Ingredient from "../Ingredient/Ingredient.jsx";
import "./Burger.css";

const Burger = (props) => {
  //console.log("Burger.jsx ---props :",props);
  let IngredientArr = props.ingredients
    .map((item) => {
      //  let amountArr = []
      //  for(let i=0;i<item.amount;i++){
      //     amountArr.push(i)
      //  }
      // *** alternative below *** :
      let amountArr = [...Array(item.amount).keys()]; // Using this tachnique we can generate a Array by fixed size..see documentation
      return amountArr.map(() => {
        return <Ingredient type={item.type} key={Math.random()} />;
      });
    })
    .reduce((arr, element) => {       // reduce() funtion uses to make one array from multi array..see documentation
      return arr.concat(element);
    }, []);

    if (IngredientArr.length===0){
        IngredientArr = <i>Please Add Some Ingredients!</i>
    }
  //console.log(IngredientArr);
  return (
    <div className="Burger">
      <Ingredient type="bread-top" />

      {IngredientArr}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
