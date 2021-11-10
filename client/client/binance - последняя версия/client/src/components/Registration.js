import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import Logo from "../img/logo-png2.png";
import {toggleLogin} from "../redux/actions";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const Registration = (props) => {
    const [form, setForm] = useState({
        email: '', password: '', name: "", binanceId: "", repassword: ""
    })
    const [loading, setLoading] = useState(false)
    const [regText, setRegText] = useState("Зарегистрироваться")
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const registrationHandler = async () => {
        try {
            setLoading(true)
            setRegText("ожидайте...")
            if(!form.name) {
                notifyError("Вы не указали Имя")
            }
            if(!form.email) {
                notifyError("Вы не указали Email")
            }
            if(!form.binanceId) {
                notifyError("Вы не указали BinanceId")
            }
            if(!form.password) {
                notifyError("Вы не указали Пароль")
            }
            if(form.password && !form.repassword) {
                notifyError("Вы не повторили Пароль")
            }
            if(form.password && form.repassword && form.password !== form.repassword) {
                notifyError("Введенные пароли не совпадают")
            }
            if(form.name && form.email && form.binanceId && form.repassword && form.password && form.repassword===form.password){
                const data = await axios.post('/api/auth/register',{ ...form }
                ).catch((error) => {
                    console.log(error.response.data.message)
                    notifyError(error.response.data.message)
                    setLoading(false)
                    setRegText("Зарегистрироваться")
                })
                if(data){
                    console.log(data)
                    notifySuccess(data.data.message + `. Теперь вы можете войти`)
                    setLoading(false)
                    setRegText("Зарегистрироваться")
                    setTimeout(()=>{
                        props.toggleLogin()
                    },1500)
                }
            }
            else{
                setLoading(false)
                setRegText("Зарегистрироваться")
            }
        } catch (e) {
            console.log(e.message)
            notifyError(e.message)
            setLoading(false)
            setRegText("Зарегистрироваться")
        }
    }
    const notifySuccess = (data) => toast.success(data);
    const notifyError = (data) => toast.error(data);
    const notifyWarn = (data) => toast.warn(data);
    const notifyInf = (data) => toast.info(data);
    return (
        <div className="login-wrap">
            <img src={Logo} alt="" className=""/>
            <h2 className="">Let’s Get Started</h2>
            <p className="">Создание новой учетной записи</p>
            <div className="input">
                <i className="far fa-user"></i>
                <input type="text" className="" placeholder="Имя" name="name" value={form.name} onChange={(event)=>changeHandler(event)} />
            </div>
            <div className="input">
                <i className="far fa-envelope"></i>
                <input type="email" className="" placeholder="Email" name="email" value={form.email} onChange={(event)=>changeHandler(event)} />
            </div>
            <div className="input">
                <i className="far fa-lock-alt"></i>
                <input type="password" className="" placeholder="Пароль" name="password" value={form.password} onChange={(event)=>changeHandler(event)}  />
            </div>
            <div className="input">
                <i className="far fa-lock-alt"></i>
                <input type="password" className="" placeholder="Повторите пароль"  name="repassword" value={form.repassword} onChange={(event)=>changeHandler(event)} />
            </div>
            <div className="input">
                <i className="far fa-id-card"></i>
                <input type="text" className="" placeholder="Binance ID" name="binanceId" value={form.binanceId} onChange={(event)=>changeHandler(event)} />
            </div>
            <button className="login-btn" onClick={()=>registrationHandler()} disabled={loading}>
                {loading?<div className="fa-1x"><i className="fas fa-spinner fa-spin"></i></div>:""}
                {regText}
            </button>
            <p className="">Есть аккаунта? <span onClick={()=>props.toggleLogin()}>Войти</span></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
