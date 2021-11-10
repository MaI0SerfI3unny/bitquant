import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import Logo from "../img/logo-png2.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {toggleLogin} from "../redux/actions";

const Login = (props) => {
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const [loading, setLoading] = useState(false)
    const [loginText, setLoginText] = useState("Войти")
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const loginHandler = async () => {
        try {
            setLoading(true)
            setLoginText("ожидайте...")
            if(!form.email) {
                notifyError("Вы не указали Email")
            }
            if(!form.password) {
                notifyError("Вы не указали Пароль")
            }
            if(form.email && form.password){
                const data = await axios.post('/api/auth/login',{ ...form }
                ).catch((error) => {
                    console.log(error.response.data.message)
                    notifyError(error.response.data.message)
                    setLoading(false)
                    setLoginText("Войти")
                })
                //localStorage.setItem("userData", JSON.stringify({ "token": data.token, "ava": "", "role": data.role, "id": data.userId, "email": data.email }))
                //window.location.href = "/trade-app"
                // const data = await request('/api/users/sendUserEmail', 'POST', {...form})
                if(data){
                    setLoading(false)
                    setLoginText("Войти")
                    localStorage.setItem("userData", JSON.stringify({ "id": data.data._id, "name": data.data.name, "binanceId": data.data.binanceId, "email": data.data.email }))
                    window.location.href = "/trade-app"
                }
            }
            else{
                setLoading(false)
                setLoginText("Войти")
            }
        } catch (e) {
            console.log(e.message)
            notifyError(e.message)
            setLoading(false)
            setLoginText("Войти")
        }
    }
    const notifySuccess = (data) => toast.success(data);
    const notifyError = (data) => toast.error(data);
    const notifyWarn = (data) => toast.warn(data);
    const notifyInf = (data) => toast.info(data);
    return (
        <div className="login-wrap">
            <img src={Logo} alt="" className=""/>
            <p className="">Вход</p>
            <div className="input">
                <i className="far fa-envelope"></i>
                <input type="text" className="" placeholder="Email" name="email" value={form.email} onChange={(event)=>changeHandler(event)}/>
            </div>
            <div className="input">
                <i className="far fa-lock-alt"></i>
                <input type="password" className="" placeholder="Password" name="password" value={form.password} onChange={(event)=>changeHandler(event)}/>
            </div>
            <button className="login-btn" onClick={()=>loginHandler()} disabled={loading}>
                {loading?<div className="fa-1x"><i className="fas fa-spinner fa-spin"></i></div>:""}
                {loginText}
            </button>
            <p className="">Нет аккаунта? <span onClick={()=>props.toggleLogin()}>Регистрация</span></p>
            <h1 className="" onClick={()=>notifyInf("Функционал в разработке")}>Воостановить пароль</h1>
            <ToastContainer />
        </div>
    );
}
const mapDispatchToProps = {
    //createPost, showAlert
    toggleLogin
}

const mapStateToProps = state => ({
    //balance: state.binary.balance,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
