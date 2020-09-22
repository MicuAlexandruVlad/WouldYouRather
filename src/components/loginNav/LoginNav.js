import React, { Component } from 'react'
import './LoginNav.scss'
import Login from '../login/Login.js'
import Register from '../register/Register.js'
import logo from '../../assets/logo.png'
import { BrowserRouter as Router,
    Link, 
    Redirect, 
    Route, 
    Switch,
    withRouter,
} from 'react-router-dom'



class LoginNav extends Component {


    // 1 = login, 2 = register
    state = {
        pathIndex: 1
    }

    render() {
        return (
            <Router>
                <Redirect to="/nav/login" />
                <div className="navBody flex-col">
                        <div className="top flex-row">
                            <img src={ logo } alt="logo" className="logo"/>
                            <span>WouldYouRather</span>
                            <div className="btns flex-row">
                                <Link 
                                    className={ 
                                        this.state.pathIndex === 1 ? "top-action active" : "top-action"
                                    }
                                    onClick={ () => {
                                        this.setState({
                                            pathIndex: 1
                                        })
                                    } } 
                                    id="linkLogin" 
                                    to="/nav/login">Login</Link>
                                <Link 
                                    className={ 
                                        this.state.pathIndex === 2 ? "top-action active" : "top-action"
                                    }
                                    onClick={ () => {
                                        this.setState({
                                            pathIndex: 2
                                        })
                                    } }
                                    id="linkRegister" 
                                    to="/nav/register">Register</Link>
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
            </Router>
        )
    }
}

export default withRouter(LoginNav)