import React, { Component } from 'react'
import './Question.scss'
import Radio from '@material-ui/core/Radio';
import expandIcon from '../../../assets/expand.png'
import { connect } from 'react-redux';
import { updateUser } from '../../../actions/users';
import { updateQuestion } from '../../../actions/questions';
import { updateEntry } from '../../../actions/leaderboardEntries';

class Question extends Component {

    state = {
        firstChecked: false,
        secondChecked: false,
        disabled: false,
        pickedOption: 0,
        p1: '',
        p2: '',
    }

    componentDidMount() {
        if (this.props.answered) {
            this.computePercentage(this.props.question)
            this.setState({
                disabled: true
            })
            if (this.props.question.pickedOption === 1) {
                this.setState({
                    firstChecked: true
                })
            } else {
                this.setState({
                    secondChecked: true
                })
            }
        }
    }

    computePercentage(question) {
        if (question.firstOptionVotes === 1 && question.secondOptionVotes === 0) {
            this.setState({
                p1: "100%",
                p2: "0%"
            })
        } else if (question.secondOptionVotes === 1 && question.firstOptionVotes === 0) {
            this.setState({
                p1: "0%",
                p2: "100%"
            })
        } else if (question.secondOptionVotes === 0 && question.firstOptionVotes === 0) {
            this.setState({
                p1: "0%",
                p2: "0%"
            })
        } else {
            const p1 = Math.round(question.firstOptionVotes / (question.firstOptionVotes + question.secondOptionVotes) * 100)
            const p2 = Math.round(question.secondOptionVotes / (question.firstOptionVotes + question.secondOptionVotes) * 100)
            this.setState({
                p1: `${p1}%`,
                p2: `${p2}%`
            })
        }
    }

    handleChange(option) {
        const question = this.props.question
        console.log('handleChange -> ', question)
        if (option === 1) {
            this.setState({
                firstChecked: true,
                secondChecked: false,
                disabled: true,
                pickedOption: option,
            })
            question.firstOptionVotes++
        } else {
            this.setState({
                firstChecked: false,
                secondChecked: true,
                disabled: true,
                pickedOption: option,
            })
            question.secondOptionVotes++
        }
        this.computePercentage(question)

        this.props.dispatch(updateQuestion(question))
        setTimeout(() => {
            // TODO: after user picks option, move the question to answered questions after 5s or so
            
            this.props.dispatch(updateUser({
                answeredQuestions: this.props.user.answeredQuestions.push(this.props.question.id),
                pickedOptions: this.props.user.pickedOptions.push(option),
                answeredQuestionsCount: this.props.user.answeredQuestionsCount++,
                createdQuestions: this.props.user.createdQuestions
            }))

            this.props.dispatch(updateEntry({
                id: this.props.user.id,
                answeredQuestions: this.props.user.answeredQuestionsCount,
                createdQuestions: this.props.user.createdQuestions,
                totalScore: this.props.user.answeredQuestionsCount + this.props.user.createdQuestions,
            }))
        }, 5000);
    }

    onExpand() {
        this.props.onQuestionExpand(this.props.question.id)
    }

    render() {
        return (
            <div className="question-body flex-col">
                <div 
                    className={ this.state.pickedOption !== 0 ? "progress max-width" : "progress" }></div>
                <div className="question-top flex-row">
                    <div className="top-initial-holder flex-row">
                        <span className="initial">{ this.props.question.creatorName.charAt(0) }</span>
                    </div>
                    <div className="top-question flex-col">
                        <span className="wyr">Would you rather...?</span>
                        <div className="asked-by-holder flex-row">
                            <span>Asked by</span>
                            <span className="asked-by">{ 
                                this.props.question.creatorName === `${this.props.user.firstName} ${this.props.user.lastName}` ?
                                "You" : this.props.question.creatorName 
                            }</span>
                        </div>
                    </div>
                    <img 
                        onClick={ () => this.onExpand() } 
                        src={ expandIcon } 
                        alt="expand" 
                        className={ this.props.showExpand ? "expand" : "expand hidden" }
                        />
                </div>
                <div className="answers-holder flex-col">
                    <div className="answer-row flex-row">
                        <Radio
                            checked={ this.state.firstChecked }
                            onChange={ () => this.handleChange(1) }
                            name="radio-button"
                            disabled={ this.state.disabled }
                            />
                        <span className="option">{ this.props.question.firstOption }</span>
                        <span
                            className={ this.state.pickedOption !== 0 || this.props.answered ? 
                                "percentage op1" : "percentage" }>{
                                `${this.state.p1} ( ${this.props.question.firstOptionVotes} out of ${ 
                                    this.props.question.firstOptionVotes + this.props.question.secondOptionVotes
                                 } votes )`
                            }</span>
                    </div>
                    <div className="answer-row flex-row">
                        <Radio
                            checked={ this.state.secondChecked }
                            onChange={ () => this.handleChange(2) }
                            name="radio-button"
                            disabled={ this.state.disabled }
                            />
                        <span className="option">{ this.props.question.secondOption }</span>
                        <span 
                            className={ this.state.pickedOption !== 0 || this.props.answered ?
                                "percentage op1" : "percentage" }>{
                                `${this.state.p2} ( ${this.props.question.secondOptionVotes} out of ${ 
                                    this.props.question.firstOptionVotes + this.props.question.secondOptionVotes
                                 } votes )`
                            }</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (appState) => {
    return {
        user: appState.users
    }
}

export default connect(mapState)(Question)