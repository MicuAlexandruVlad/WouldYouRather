import React, { Component } from 'react'
import './SingleQuestion.scss'
import Question from '../../shared/components/question/Question'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class SingleQuestion extends Component {

    getQuestion() {
        let answered = false
        let question = {}
        let questionFilter = this.props.questions.filter((storeQuestion) =>
            storeQuestion.id === this.props.location.pathname.split('/')[2]
        )

        console.log(questionFilter)

        if (questionFilter.length === 0) {
            return <div className="flex-col">
                <h1>404</h1>
                <h4>Question not found</h4>
            </div>
        } else {
            question = questionFilter[0]
            for (let index = 0; index < this.props.user.answeredQuestions.length; index++) {
                const questionId = this.props.user.answeredQuestions[index];
                
                if (questionId === question.id) {
                    answered = true
                    question.pickedOption = this.props.user.pickedOptions[index]
                    break
                }
            }
    
            return <Question 
                        key={ question }
                        answered={ answered }
                        question={ question }
                        showExpand={ false }
                        onQuestionExpand={ this.props.onQuestionExpand } />
        }
    }

    render() {
        return (
            <div className="sq-body flex-col">
                { this.getQuestion() }
            </div>
        )
    }
}

const mapState = appState => {
    return {
        user: appState.users,
        questions: appState.questions,
    }
}

export default withRouter(connect(mapState)(SingleQuestion))