import React, { Component } from 'react'
import './Leaderboard.scss'
import LeaderboardEntry from '../leaderboardEntry/LeaderboardEntry'
import { connect, ReactReduxContext } from 'react-redux'

class Leaderboard extends Component {
    render() {
        return (
            <div className="leaderboard-body flex-col">
                {
                    this.props.entries.map((entry) => {
                        return <LeaderboardEntry 
                                    key={ entry.id }
                                    entry={ entry } />
                    })
                }
            </div>
        )
    }
}

const mapState = (appState) => {
    return {
        entries: appState.leaderboardEntries
    }
}

export default connect(mapState)(Leaderboard)
