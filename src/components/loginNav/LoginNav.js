import React, { Component } from 'react'
import './LoginNav.scss'
import Login from '../login/Login.js'
import Register from '../register/Register.js'
import logo from '../../assets/logo.png'
import { 
    Link, 
    Route, 
    Redirect,
    Switch, withRouter, NavLink
} from 'react-router-dom'



class LoginNav extends Component {


    // 1 = login, 2 = register
    state = {
        pathIndex: 1
    }

    render() {
        return (
            <div className="navBody flex-col">
                <Redirect to="/nav/login" />
                <div className="top flex-row">
                    <img src={ logo } alt="logo" className="logo"/>
                    <span>WouldYouRather</span>
                    <div className="btns flex-row">
                        <NavLink 
                            className="top-action"
                            activeClassName="active"
                            onClick={ () => {
                                this.setState({
                                    pathIndex: 1
                                })
                            } } 
                            id="linkLogin" 
                            to="/nav/login">Login</NavLink>
                        <NavLink 
                            className="top-action"
                            activeClassName="active"
                            onClick={ () => {
                                this.setState({
                                    pathIndex: 2
                                })
                            } }
                            id="linkRegister" 
                            to="/nav/register">Register</NavLink>
                    </div>
                </div>
                <Switch>
                    <Route render={() => (
                        <Login onSuccess={ this.props.onSuccess } />
                    )} exact path="/nav/login"></Route>
                    <Route render={() => (
                        <Register />
                    )} exact path="/nav/register"></Route>  
                </Switch>         
            </div>
        )
    }
}

export default withRouter(LoginNav)