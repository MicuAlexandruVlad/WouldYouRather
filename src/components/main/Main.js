import React, { Component } from 'react'
import './Main.scss'
import SideNav from '../sideNav/SideNav.js'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Home from '../home/Home.js'
import NewQuestion from '../newQuestion/NewQuestion.js'
import Leaderboard from '../leaderboard/Leaderboard.js'
import { ReactReduxContext } from 'react-redux'
import $ from 'jquery'

export default class Main extends Component {

    componentDidMount() {
        this.navLeaderboard()
    }

    handleSignOut = () => {
        this.props.onSignOut()
    }

    render() {
        return (
            <div className="main-body flex-row">
                <SideNav 
                    onHome={ this.handleHomeNav }
                    onNewQuestion={ this.handleNewQuestionNav }
                    onLeaderboard={ this.handleLeaderboardNav }
                    onSignOut={ this.handleSignOut } />

                <Router>
                    <Link id="hLink" to="/home"></Link>
                    <Link id="nqLink" to="/new-question"></Link>
                    <Link id="lLink" to="/leaderboard"></Link>

                    <Route render={ () => (
                        <ReactReduxContext.Consumer>
                            {({ store }) => (
                                <Home store={ store } />
                            )}
                        </ReactReduxContext.Consumer>
                    ) } exact path="/home"></Route>
                    <Route render={ () => (
                        <NewQuestion />
                    ) } exact path="/new-question"></Route>
                    <Route render={ () => (
                        <Leaderboard />
                    ) } exact path="/leaderboard"></Route>
                </Router>
            </div>
        )
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
        this.setState({
            pathIndex: 1
        })

        $("#hLink")[0].click()
    }

    navNewQuestion() {
        this.setState({
            pathIndex: 2
        })

        $("#nqLink")[0].click()
    }

    navLeaderboard() {
        this.setState({
            pathIndex: 3
        })

        $("#lLink")[0].click()
    }
}
