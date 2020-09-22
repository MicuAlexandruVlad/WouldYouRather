import { combineReducers } from 'redux'
import questions from './questions'
import users from './users.js'
import leaderboardEntries from './leaderboardEntries.js'

export default combineReducers({
    questions,
    users,
    leaderboardEntries,
})