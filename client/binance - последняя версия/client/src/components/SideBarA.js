import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";
import Logo from "../img/logo-png.png"


const SideBarA = (props) => {

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="" className="logo-img"/>
                <h1 className="logo-text">BitQuant</h1>
            </div>
            <div className="sidebar-menu">
                <div className="sidebar-menu-main">
                    <ul className="">
                        <li><NavLink to="/trade-app" className="link" activeClassName='active'><i className="fas fa-chart-pie"></i>Торговля</NavLink></li>
                        <li><NavLink to="/history" className="link" activeClassName='active'><i className="fas fa-ballot"></i>История торговли</NavLink></li>
                        {/*<li><NavLink to="/strategy" className="link" activeClassName='active'><i className="fas fa-lightbulb"></i>Стратегии</NavLink></li>*/}
                        <li><NavLink to="/instructions" className="link" activeClassName='active'><i className="fas fa-file-spreadsheet"></i>Инструкции</NavLink></li>
                    </ul>
                </div>
                <div className="sidebar-menu-alt">
                    <ul className="">
                        <li><NavLink to="/description" className="link" activeClassName='active'><i className="fas fa-cog"></i>Описание проекта</NavLink></li>
                        <li><NavLink to="/terms-of-use" className="link" activeClassName='active'><i className="fas fa-award"></i>Пользовательское соглашение</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}


const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarA)
