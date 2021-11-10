import React, { useState } from 'react';
import {connect} from 'react-redux'
import Logo from "../assets/img/logo-png2.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toggleLogin} from "../redux/actions";
import storage from '../storage/storage.js'
import {sendLogin} from '../api/api.js'

const Login = (props) => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [loginText, setLoginText] = useState("Войти")
    const changeHandler = event => { setForm({ ...form, [event.target.name] : event.target.value })}
    const loginHandler = async () => {
        try {
            setLoading(true)
            setLoginText("ожидайте...")
            if(!form.email){ notifyError("Вы не указали Email") }
            if(!form.password) { notifyError("Вы не указали Пароль") }
            if(form.email && form.password){
              sendLogin(form).catch((error) => {
                    notifyError("Проблема с доставкой информации")
                    setLoading(false)
                    setLoginText("Войти")
                }).then((data) => {
                  if(data.status === 200){
                      setLoading(false)
                      setLoginText("Войти")
                     localStorage.setItem("userData", JSON.stringify({
                        "id": data.data.id,
                        "name": data.data.name,
                        "email": data.data.email,
                        "password": form.password,
                        "statusTrade": false
                       }))
                      window.location.href = "/trade-app"
                  }else{
                    setLoading(false)
                    setLoginText("Войти")
                    notifyError("Неверный логин или пароль")
                  }
              })
            }
            else{
              setLoading(false)
              setLoginText("Войти")
            }
        } catch (e) {
            console.log(e.message)
            setLoading(false)
            setLoginText("Войти")
        }
    }

    const notifyError = (data) => toast.error(data);
    const notifyInf = (data) => toast.info(data);
    return (
        <div className="login-wrap">
            <img src={Logo} alt="Logotype"/>
            <p>Вход</p>
            {storage.form_login.map(el =>
                <div className="input" key={el.name}>
                    <i className={el.ico}></i>
                    <input type={el.type} placeholder={el.holder} name={el.name} value={eval(el.value)} onChange={(event)=>changeHandler(event)}/>
                </div>)}
            <button className="login-btn" onClick={()=>loginHandler()} disabled={loading}>
                {loading?<div className="fa-1x"><i className="fas fa-spinner fa-spin"></i></div>:""}
                {loginText}
            </button>
            <p>Нет аккаунта? <span onClick={()=>props.toggleLogin()}>Регистрация</span></p>
            <h1 onClick={()=>notifyInf("Функционал в разработке")}>Воостановить пароль</h1>
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
