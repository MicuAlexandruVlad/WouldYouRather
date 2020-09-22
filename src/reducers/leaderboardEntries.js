import { UPDATE_ENTRY, RECEIVE_ENTRIES } from '../actions/leaderboardEntries'

export default function entries(state = [], action) {
    switch (action.type) {
        case UPDATE_ENTRY:
            
            return Object.assign([], state, state.map((entry) => {
                if (entry.id === action.entry.id) {
                    entry.totalScore = action.entry.totalScore
                    entry.answeredQuestions = action.entry.answeredQuestions
                    entry.createdQuestions = action.entry.createdQuestions
                }

                return entry
            }))
        case RECEIVE_ENTRIES:
            
            return Object.assign([], state, action.entries)
        default:
            return state
    }
}