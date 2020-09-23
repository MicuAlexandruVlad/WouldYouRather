import React, { Component } from 'react'
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
import '../components/App.scss';
import LoginNav from '../components/loginNav/LoginNav.js'
import Main from '../components/main/Main.js'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { connect } from 'react-redux';
import { handleData } from '../actions/shared.js'
import { signOutUser } from '../actions/users.js'
import { Switch } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    
    console.log(localStorage.getItem("auth-id"))
    console.log(this.checkForAuthUser())
    // console.log(this.props.user)
    if (this.checkForAuthUser()) {
      this.props.dispatch(handleData(localStorage.getItem('auth-id')))
      // this.navMain()
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
    // this.navLogin()
  }

  render() {
    return (
      <div className="App">
        <ReactNotification />
        <Link id="mainLink" to="/"></Link>
        <Link id="loginNavLink" to="/nav"></Link>

        <Switch>
            <Route render={() => (
              <LoginNav onSuccess={ this.handleSuccessfulLogin } />
            )} path="/nav"></Route>
            <Route render={() => (
              this.checkForAuthUser() ? <Main onSignOut={ this.handleSignOut } /> : <Redirect to="/nav" />
            )} path="/"></Route>
          </Switch>
      </div>
    )
  }

  checkForAuthUser() {
    if (localStorage.getItem('auth-id') === undefined || localStorage.getItem('auth-id') === null) {
      return false
    }

    return true
  }
  
  navMain() {
    this.props.history.push('/home/unanswered')
  }
}

const mapState = appState => {
  return {
    user: appState.users
  }
}

export default withRouter(connect(mapState)(App))