import React, { useState } from 'react';
import {connect} from 'react-redux'
import Logo from "../assets/img/logo-png2.png";
import {toggleLogin} from "../redux/actions";
import {toast, ToastContainer} from "react-toastify";
import {sendRegister} from '../api/api.js'
import storage from '../storage/storage.js'

const Registration = (props) => {
    const [form, setForm] = useState({ email: '', password: '', name: "", repassword: "" })
    const [loading, setLoading] = useState(false)
    const [regText, setRegText] = useState("Зарегистрироваться")
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const registrationHandler = async () => {
        try {
            setLoading(true)
            setRegText("ожидайте...")

            //Validate For REGISTRATION
            if(!form.name) { notifyError("Вы не указали Имя") }
            if(!form.email) { notifyError("Вы не указали Email") }
            if(!form.password) { notifyError("Вы не указали Пароль") }
            if(form.password && !form.repassword) { notifyError("Вы не повторили Пароль") }
            if(form.password && form.repassword && form.password !== form.repassword) { notifyError("Введенные пароли не совпадают") }

            if(form.name && form.email  && form.repassword && form.password && form.repassword === form.password){
                const data = sendRegister(form)
                if(data){
                    notifySuccess(`Теперь вы можете войти`)
                    setLoading(false)
                    setRegText("Зарегистрироваться")
                    setTimeout(()=>{
                        props.toggleLogin()
                    }, 1500)
                }
            }
            else{
                setLoading(false)
                setRegText("Зарегистрироваться")
            }
        } catch (e) {
            notifyError("Something wrong with server")
            setLoading(false)
            setRegText("Зарегистрироваться")
        }
    }
    const notifySuccess = (data) => toast.success(data);
    const notifyError = (data) => toast.error(data);
    return (
        <div className="login-wrap">
            <img src={Logo} alt="" className=""/>
            <h2 className="">Let’s Get Started</h2>
            <p className="">Создание новой учетной записи</p>
            {storage.form_register.map(el =>
                <div className="input" key={el.name}>
                    <i className={el.ico}></i>
                    <input type={el.type} className="" placeholder={el.holder}  name={el.name} value={eval(el.value)} onChange={(event)=>changeHandler(event)} />
                </div>)}
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
