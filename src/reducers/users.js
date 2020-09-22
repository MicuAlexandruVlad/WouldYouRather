import { AUTH_USER, SIGN_OUT_USER, UPDATE_USER } from '../actions/users.js'
import Api from '../utils/Api'

export default function users(state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            
            return Object.assign({}, state, {
                id: action.user.id,
                email: action.user.data().email,
                firstName: action.user.data().firstName,
                lastName: action.user.data().lastName,
                createdQuestions: action.user.data().createdQuestions,
                pickedOptions: action.user.data().pickedOptions,
                answeredQuestions: action.user.data().answeredQuestions,
                answeredQuestionsCount: action.user.data().answeredQuestionsCount,
            })

        case UPDATE_USER:
            let newState = Object.assign({}, state, {
                pickedOptions: state.pickedOptions,
                answeredQuestions: state.answeredQuestions,
                answeredQuestionsCount: state.answeredQuestionsCount,
                createdQuestions: state.createdQuestions,
            })

            const client = new Api()
            client.updateUser(newState)

            return newState
            
        case SIGN_OUT_USER:
            return Object.assign({}, state, {})
        
        default:
            return Object.assign({}, state)
    }
}

