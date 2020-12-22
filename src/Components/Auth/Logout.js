import React,{ Component } from "react";
import {Switch, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { logout } from "../../redux/authActionCreators";


const mapDispatchToProps = dispatch =>{
    return {
        logout : ()=>dispatch(logout())
    }
}

class Logout extends Component{
    componentDidMount(){
        this.props.logout()

    }
    render(){
        return (
            <Switch>
                <Redirect to="/" />
            </Switch>
        )
    }
}


export default connect(null,mapDispatchToProps)(Logout);