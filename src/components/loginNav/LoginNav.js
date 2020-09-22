import React, { Component } from 'react'
import './LoginNav.scss'
import Login from '../login/Login.js'
import Register from '../register/Register.js'
import logo from '../../assets/logo.png'
import * as $ from 'jquery'
import { BrowserRouter, Link, Route } from 'react-router-dom'

export default class LoginNav extends Component {

    componentDidMount() {
        this.onNavLogin()
    }

    render() {
        return (
            <div className="navBody flex-col">
                <div className="top flex-row">
                    <img src={ logo } alt="logo" className="logo"/>
                    <span>WouldYouRather</span>
                    <div className="btns flex-row">
                        <button 
                            onClick={() => { this.onNavLogin() }} 
                            id="btnLogin" 
                            className="top-action">Login</button>
                        <button 
                            onClick={() => { this.onNavRegister() }} 
                            id="btnRegister" 
                            className="top-action">Register</button>
                    </div>
                </div>
                <BrowserRouter>
                    <Link id="linkLogin" to="/login">Login</Link>
                    <Link id="linkRegister" to="/register">Register</Link>

                    <Route render={() => (
                        <Login onSuccess={ this.props.onSuccess } />
                    )} exact path="/login"></Route>

                    <Route render={() => (
                        <Register />
                    )} exact path="/register"></Route>
                
                </BrowserRouter>
            </div>
        )
    }

    onNavLogin() {
        $("#btnLogin").addClass("active")
        $("#btnRegister").removeClass("active")
        $("#linkLogin")[0].click()
    }

    onNavRegister() {
        $("#btnLogin").removeClass("active")
        $("#btnRegister").addClass("active")
        $("#linkRegister")[0].click()
    }
}
