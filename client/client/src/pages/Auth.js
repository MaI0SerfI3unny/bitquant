import React from 'react';
import {connect} from 'react-redux'
import Login from "../components/Login";
import Registration from "../components/Registration";

const Auth = (props) => {
    return (<div className="auth-wrap">{props.isLogin?<Login/>:<Registration/>}</div>);
}
const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //balance: state.binary.balance,
    isLogin: state.uiApi.isLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
