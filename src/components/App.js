import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom';
import '../components/App.scss';
import LoginNav from '../components/loginNav/LoginNav.js'
import Main from '../components/main/Main.js'
import * as $ from 'jquery'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { connect } from 'react-redux';
import { handleData } from '../actions/shared.js'
import { signOutUser } from '../actions/users.js'

class App extends Component {

  componentDidMount() {
    
    console.log(localStorage.getItem("auth-id"))
    console.log(this.checkForAuthUser())
    if (!this.checkForAuthUser()) {
      this.navLogin()
    } else {
      this.props.dispatch(handleData(localStorage.getItem('auth-id')))
      this.navMain()
    }
  } 

  handleSuccessfulLogin = (doc) => {
    localStorage.setItem('auth-id', doc.id)
    this.props.dispatch(handleData(doc.id))
    this.navMain()
  }

  handleSignOut = () => {
    console.log('Sign out')
    localStorage.removeItem('auth-id')
    this.props.dispatch(signOutUser())
    this.navLogin()
  }

  render() {
    return (
      <div className="App">
        <ReactNotification />
        <BrowserRouter>
          <Link id="loginNavLink" to="/nav"></Link>
          <Link id="mainLink" to="/main"></Link>
          

          <Route render={() => (
            <LoginNav onSuccess={ this.handleSuccessfulLogin } />
          )} exact path="/nav"></Route>
          <Route render={() => (
            <Main onSignOut={ this.handleSignOut } />
          )} exact path="/main"></Route>
        </BrowserRouter>
      </div>
    )
  }

  checkForAuthUser() {
    if (localStorage.getItem('auth-id') === undefined || localStorage.getItem('auth-id') === null) {
      return false
    }

    return true
  }

  navLogin() {
    $("#loginNavLink")[0].click()
  }

  navMain() {
    $("#mainLink")[0].click()
  }
}

export default connect()(App)