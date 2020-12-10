import React from "react";
import Header from "./Header/Header.jsx";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.jsx";



const Main=props=>{
    return (
        <div>
            <Header/>
            <div className="container">
                <BurgerBuilder/>
            </div>
            

        </div>
    )
}



export default Main;