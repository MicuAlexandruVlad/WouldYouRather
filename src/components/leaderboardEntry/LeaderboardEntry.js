import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LeaderboardEntry.scss'

class LeaderboardEntry extends Component {

    componentDidUpdate() {
        console.log(this.props.user);
    }

    render() {
        return (
            <div className="entry-body flex-col">
                <div className="entry-top flex-row">
                    <div className="initial-holder flex-col">
                        <span className="initial">{ this.props.entry.name === undefined ? 
                        "" : `${this.props.entry.name.charAt(0)}` }</span>
                    </div>
                    <span className="name">{ this.props.entry.name === undefined ? 
                        "" : `${this.props.entry.name}` }</span>
                </div>
                <div className="sep"></div>
                <div className="leaderboard-data flex-row">
                    <div className="flex-col legend-main">
                        <div className="legend-holder flex-row">
                            <div className="legend answered"></div>
                            <span className="ans">{
                                this.props.entry.answeredQuestions === undefined ? 
                                "" : `${this.props.entry.answeredQuestions} Answered Questions`
                            }</span>
                        </div>
                        <div className="legend-holder flex-row">
                            <div className="legend created"></div>
                            <span className="ans">{
                                this.props.entry.createdQuestions === undefined ? 
                                "" : `${this.props.entry.createdQuestions} Created Questions`
                            }</span>
                        </div>
                    </div>
                    <div className="score-holder flex-col">
                        <span>Total score</span>
                        <span className="score">{ this.props.entry.totalScore }</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(LeaderboardEntry)
