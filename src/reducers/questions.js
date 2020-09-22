import { RECEIVE_QUESTIONS, ADD_QUESTION, UPDATE_QUESTION } from '../actions/questions.js'
import Api from '../utils/Api'

export default function questions(state = [], action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            console.log(action.questions)
            return Object.assign([], state, action.questions)
    
        case ADD_QUESTION: 
            return Object.assign([], state, [action.question].concat(state))

        case UPDATE_QUESTION: 
            return Object.assign([], state, state.map((question) => {
                if (question.id === action.question.id) {
                    question = action.question
                    console.log('Question reducer', question)
                    const client = new Api()
                    client.updateQuestion(question)
                }
                return question
            }))

        default:
            return state
    }
}