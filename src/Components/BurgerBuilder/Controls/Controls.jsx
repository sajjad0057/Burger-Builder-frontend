import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";




const BuildControl = props =>{
    //console.log("%%%%-->",props);
    return(

        <div className="d-flex">
            <div className="mr-auto ml-5" >
                <span style={{fontWeight:"bold",fontSize:"1.2rem", color : "#696969",textTransform:"capitalize"}}>
                     {props.type.type} 
                </span>
                <span style={{fontWeight:"bold",fontSize:"1.2rem", color : "#696969"}}>
                {"  "} x {props.type.amount}
                </span>
                
            </div>
            <button className="btn btn-warning btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
    )
}


const Controls = props =>{
    
    //console.log("%%%%",[...props.ingredients]);
    return (
        <div className="container ml-md-5" style={{textAlign:"center"}} >
            <Card style={{
                marginTop:"30px",
                marginBottom : "30px",
                textAlign : "center"
            }}>
                <CardHeader style={{
                    backgroundColor:"#D70f64",
                    color : "white",
                }}>
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {
                       [...props.ingredients].map(item=>{
                            return <BuildControl

                             type={item} 
                             key={Math.random()}
                             added = {()=>props.addIngredient(item.type)}
                             removed = {()=>props.removeIngredient(item.type)}
                
                             />
                        })
                    }
                </CardBody>
                <CardFooter >
                    <h5 style={{color : "#696969"}}><i>Price : {props.totalPrice} /- BDT</i></h5>

                </CardFooter>
                <Button disabled={!props.purchasable} onClick={props.toggleModal} style={{backgroundColor:"#f55195"}}>
                    <i>Order Now</i>
                </Button>
            </Card>
        </div>
    )
}

export default Controls
