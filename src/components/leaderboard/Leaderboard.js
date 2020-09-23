import React, { Component } from 'react'
import './Leaderboard.scss'
import LeaderboardEntry from '../leaderboardEntry/LeaderboardEntry'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    sortList(list) {
        const lc = [...list].sort((l1, l2) => {
            if (l1.totalScore > l2.totalScore) {
                return -1
            }
            if (l1.totalScore < l2.totalScore) {
                return 1
            }

            return 0
        })

        return lc
    }

    render() {
        return (
            <div className="leaderboard-body flex-col">
                {
                    this.sortList(this.props.entries).map((entry) => {
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
