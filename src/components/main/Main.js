import React, { Component } from 'react'
import './Main.scss'
import SideNav from '../sideNav/SideNav.js'
import { Link, NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Home from '../home/Home.js'
import NewQuestion from '../newQuestion/NewQuestion.js'
import Leaderboard from '../leaderboard/Leaderboard.js'
import SingleQuestions from '../singleQuestion/SingleQuestion'
import { ReactReduxContext } from 'react-redux'
import $ from 'jquery'

class Main extends Component {
    handleSignOut = () => {
        this.props.onSignOut()
    }

    render() {
        return (
            <div className="main-body flex-row">
                {/* <Redirect to="/home/unanswered" /> */}
                <SideNav 
                    onHome={ this.handleHomeNav }
                    onNewQuestion={ this.handleNewQuestionNav }
                    onLeaderboard={ this.handleLeaderboardNav }
                    onSignOut={ this.handleSignOut } />

                    <Switch>
                        <Route render={ () => (
                            <SingleQuestions />
                        ) } path="/questions/:questionId"></Route>
                        <Route render={ () => (
                            <ReactReduxContext.Consumer>
                                {({ store }) => (
                                    <Home 
                                        store={ store }
                                        onQuestionExpand={ this.handleQuestionExpand } />
                                )}
                            </ReactReduxContext.Consumer>
                        ) } path="/home"></Route>
                        <Route render={ () => (
                            <NewQuestion />
                        ) } path="/add"></Route>
                        <Route render={ () => (
                            <Leaderboard />
                        ) } path="/leaderboard"></Route>
                    </Switch>
            </div>
        )
    }

    handleQuestionExpand = (id) => {
        this.navSingleQuestion(id)
    }

    handleHomeNav = () => {
        this.navHome()
    }

    handleNewQuestionNav = () => {
        this.navNewQuestion()
    }

    handleLeaderboardNav = () => {
        this.navLeaderboard()
    }

    navHome() {
        this.props.history.push('/home/unanswered')
    }

    navNewQuestion() {
        this.props.history.push('/add')
    }

    navLeaderboard() {
        this.props.history.push('/leaderboard')
    }

    navSingleQuestion(id) {
        this.props.history.push(`/questions/${id}`)
    }
}

export default withRouter(Main)