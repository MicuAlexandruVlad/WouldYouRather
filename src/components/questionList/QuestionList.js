import React, { Component } from 'react'
import './QuestionList.scss'
import Question from '../../shared/components/question/Question.js'

export default class QuestionList extends Component {
    render() {
        return (
            <div className="question-list-body flex-col">
                { this.props.questions.map((question) => (
                    <Question 
                        key={ question.id }
                        answered={ this.props.answered }
                        question={ question }
                        />
                )) }
            </div>
        )
    }
}
