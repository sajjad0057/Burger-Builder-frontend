import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators.js";
import Order from "./Order/Order.jsx";
import Spinner from "../Spinner/Spinner.js";



const mapStateToProps = (state)=>{
    return{
        orders : state.orders,
        orderLoading : state.orderLoading,
        orderErr : state.orderErr,
        token : state.token,
        userId : state.userId,
    }
}



const mapDispatchToProps = dispatch =>{
    return{
        fatchOrders : (token,userId)=>dispatch(fetchOrders(token,userId))
    }
}


class Orders extends Component{

    componentDidMount(){
        //console.log("token",this.props.token);
        this.props.fatchOrders(this.props.token,this.props.userId)
    }
    // componentDidUpdate(){
    // console.log("orders.jsx ----check props:",this.props);
    // }
    render(){
        let orders=null;
        if(this.props.orderErr){
            orders=<div style={{
                border:"1px solid grey",
                borderRadius:"5px",
                margin:"2px",
                padding:"20px",
                boxShadow:"1px 1px #888888",
                }}>
                <p>Sorry Failed To Load Orders</p>
                </div>
        }
        else{
            if(this.props.orders.length===0){
                orders=<div style={{
                    border:"1px solid grey",
                    borderRadius:"5px",
                    margin:"2px",
                    padding:"20px",
                    boxShadow:"1px 1px #888888",
                    }}>
                    <p>Sorry! you have no orders now</p>
                    </div>

            }
            else{
                orders=this.props.orders.map(order=>{
                    //console.log("orders.jsx ----order:",order);
                    return <Order order={order} key={order.id}/>
                })

            }

        }


        return(
            <div>
                {this.props.orderLoading? <Spinner/>:orders }
            </div>
        )

    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Orders);