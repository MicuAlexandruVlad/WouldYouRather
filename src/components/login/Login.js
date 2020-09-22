import React, { Component } from 'react'
import './Login.scss'
import Input from '../../shared/components/input/Input.js'
import Api from '../../utils/Api'
import { connect } from 'react-redux'

class Login extends Component {

    state = {
        email: ''
    }

    onValueChange = (value, key) => {
        this.setState({
            email: value
        })
    }

    handleLogin() {
        const client = new Api()
        const db = client.init()

        db.collection("users").where("email", "==", this.state.email).get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 1) {
                    querySnapshot.forEach((doc) => {
                        this.props.onSuccess(doc)
                    })
                }
            })
    }

    render() {
        return (
            <div className="login-body flex-col">
                <div className="form-holder flex-col">
                    <h1>Login</h1>
                    <Input 
                        type="email"
                        label="Email"
                        elementId="emailInput"
                        onValueChange={ this.onValueChange }
                        />
                    <button onClick={ () => this.handleLogin() } className="login">Login</button>
                </div>
            </div>
        )
    }
}

export default connect()(Login)
