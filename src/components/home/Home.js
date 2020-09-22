import React, { Component } from 'react'
import './Home.scss'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import QuestionList from '../questionList/QuestionList.js'
import { connect } from 'react-redux'

class Home extends Component {

    componentDidMount() {
        this.props.store.subscribe(this.handleChanges)
    }

    state = {
        pathIndex: 1
    }

    handleChanges = () => {
        const answeredQuestions = []
        const unansweredQuestions = []
        const questions = this.props.store.getState().questions
        const user = this.props.store.getState().users

        questions.forEach(question => {
            let p = 0
            let i = 0
            for (let index = 0; index < user.answeredQuestions.length; index++) {
                const answeredQuestionId = user.answeredQuestions[index];
                
                if (answeredQuestionId === question.id) {
                    p = 1
                    i = index
                }
            }

            if (p === 0) {
                unansweredQuestions.push(question)
            } else {
                const q = {
                    ...question,
                    pickedOption: user.pickedOptions[i],
                }

                answeredQuestions.push(q)
            }
        });

        this.sortList(answeredQuestions)

        return {
            answeredQuestions,
            unansweredQuestions
        }

       
    }

    sortList(list) {
        for (let i = 0; i < list.length; i++) {
            let q = list[i];
            
            for (let j = 0; j < list.length; j++) {
                let q1 = list[j];
                
                if (q.timestamp > q1.timestamp) {
                    let a = q
                    q = q1
                    q1 = a
                }
            }
        }
    }

    render() {
        return (
            <div className="home-body flex-col">
                <Router>
                    <div className="link-holder flex-row">
                        <Link 
                            className={ this.state.pathIndex === 1 ? "active" : undefined } 
                            onClick={ () => {
                                this.setState({ pathIndex: 1 })
                        } } to="/home/unanswered">Unanswered Questions</Link>
                        <Link 
                            className={ this.state.pathIndex === 2 ? "active" : undefined } 
                            onClick={ () => {
                                this.setState({ pathIndex: 2 })
                        } } to="/home/answered">Answered Questions</Link>
                    </div>

                    <Route render={() => (
                        <QuestionList 
                            answered={ false }
                            questions={ this.handleChanges().unansweredQuestions } />
                    )} exact path="/home/unanswered"></Route>

                    <Route render={() => (
                        <QuestionList 
                            answered={ true }
                            questions={ this.handleChanges().answeredQuestions } />
                    )} exact path="/home/answered"></Route>

                    <Redirect to="/home/unanswered" />
                </Router>
            </div>
        )
    }
}

const mapState = appState => {
    return {
        questions: appState.questions
    }
}

export default connect(mapState)(Home)
