import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators.js";



const mapStateToProps = (state)=>{
    return{
        orders : state.orders,
        orderLoading : state.orderLoading,
        orderErr : state.orderErr,
    }
}



const mapDispatchToProps = dispatch =>{
    return{
        fatchOrders : ()=>dispatch(fetchOrders())
    }
}


class Orders extends Component{

    componentDidMount(){
        this.props.fatchOrders()
    }
    componentDidUpdate(){
        console.log("orders.jsx ----check props:",this.props);
    }
    render(){
        return(
            <div>
                <p>Orders</p>
            </div>
        )

    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Orders);