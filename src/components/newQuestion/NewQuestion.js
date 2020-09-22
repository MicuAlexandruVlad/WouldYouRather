import React, { Component } from 'react'
import './NewQuestion.scss'
import { store as notifStore } from 'react-notifications-component';
import Input from '../../shared/components/input/Input.js'
import 'animate.css/animate.compat.css'
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/questions.js'
import Api from '../../utils/Api.js'
import { errorNotif, successNotif } from '../../utils/NotifManager.js'
import { updateUser } from '../../actions/users';
import { updateEntry } from '../../actions/leaderboardEntries';

class NewQuestion extends Component {

    state = {
        firstOption: '',
        secondOption: ''
    }

    handleValueChange = (value, elementId) => {
        switch (elementId) {
            case "first":
                this.setState({
                    firstOption: value
                })
                break
            case "second": 
                this.setState({
                    secondOption: value
                })
                break
            default:
                break
        }
    }

    onDone() {
        if (this.state.firstOption === '' || this.state.secondOption === '') {
            notifStore.addNotification(errorNotif("One or more fields are empty"))
        } else {
            const question = {
                firstOption: this.state.firstOption,
                secondOption: this.state.secondOption,
                firstOptionVotes: 0,
                secondOptionVotes: 0, 
                creatorName: `${this.props.user.firstName} ${this.props.user.lastName}`,
                timestamp: Date.now()
            }
            new Api().insertQuestion(question).then((docRef) => {
                console.log(`Document inserted with id: ${docRef.id}`)
                question.id = docRef.id
                this.props.dispatch(addQuestion(question))
                notifStore.addNotification(successNotif("Question created"))
            })
            this.props.dispatch(updateUser({
                answeredQuestions: this.props.user.answeredQuestions,
                pickedOptions: this.props.user.pickedOptions,
                answeredQuestionsCount: this.props.user.answeredQuestionsCount,
                createdQuestions: this.props.user.createdQuestions++
            }))
            this.props.dispatch(updateEntry({
                id: this.props.user.id,
                answeredQuestions: this.props.user.answeredQuestionsCount,
                createdQuestions: this.props.user.createdQuestions,
                totalScore: this.props.user.answeredQuestionsCount + this.props.user.createdQuestions,
            }))
        }
    }

    render() {
        return (
            <div className="nq-body flex-col">
                <h1>New Question</h1>
                <div className="form flex-col">
                    <h3>Would you rather...?</h3>
                    <Input
                        type="text"
                        elementId="first"
                        placeholder="Type an answer here"
                        onValueChange={ this.handleValueChange } />
                    <h4>Or</h4>
                    <Input
                        type="text"
                        elementId="second"
                        placeholder="Type an answer here"
                        onValueChange={ this.handleValueChange } />
                    <button onClick={ () => this.onDone() } className="done">Done</button>
                </div>
            </div>
        )
    }

    getTimestamp() {

    }
}

const mapState = (appState) => {
    return {
        user: appState.users
    }
}

export default connect(mapState)(NewQuestion)