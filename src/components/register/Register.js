import React, { Component } from 'react'
import './Register.scss'
import Input from '../../shared/components/input/Input.js'
import Api from '../../utils/Api'
import User from '../../shared/models/User'
import { store as notifStore } from 'react-notifications-component';

export default class Register extends Component {

    state = {
        email: '',
        firstName: '',
        lastName: '',
    }

    onValueChange = (value, key) => {
        switch (key) {
            case "emailInput":
                this.setState({
                    email: value
                })
                break;
            case "fNameInput":
                this.setState({
                    firstName: value
                })
                break;
            case "lNameInput":
                this.setState({
                    lastName: value
                })
                break;
            default:
                break;
        }
    }

    handleRegister() {
        const client = new Api()
        const user = new User()
        const db = client.init()

        user.email = this.state.email
        user.firstName = this.state.firstName
        user.lastName = this.state.lastName

        db.collection("users").where("email", "==", user.email).get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                notifStore.addNotification({
                    title: "Error",
                    message: "Email address already used",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true,
                    }
                })
            } else {
                db.collection("users").add({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdQuestions: user.createdQuestions,
                    answeredQuestions: user.answeredQuestions,
                    pickedOptions: user.pickedOptions,
                    answeredQuestionsCount: user.answeredQuestionsCount
                })
                .then((docRef) => {
                    notifStore.addNotification({
                        title: "Success",
                        message: "Account created",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["nimated", "fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                    })
                })
            }
        })
    }

    render() {
        return (
            <div className="register-body flex-col">
                <div className="form-holder flex-col">
                    <h1>Register</h1>
                    <Input 
                        type="email"
                        label="Email"
                        elementId="emailInput"
                        onValueChange={ this.onValueChange } />
                    <Input 
                        type="text"
                        label="First Name"
                        elementId="fNameInput"
                        onValueChange={ this.onValueChange } />
                    <Input 
                        type="text"
                        label="Last Name"
                        elementId="lNameInput"
                        onValueChange={ this.onValueChange } />
                    <button onClick={ () => this.handleRegister() } className="register">Register</button>
                </div>
            </div>
        )
    }
}
