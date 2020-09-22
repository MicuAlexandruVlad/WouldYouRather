import Api from '../utils/Api'
import {receiveQuestions} from './questions'
import { authUser } from './users'
import { receiveEntries } from './leaderboardEntries'
import firebase from 'firebase'


// TODO: this should also get the user data based on the id from the local storage
export function handleData(authId) {
    const client = new Api()

    return (dispatch) => {
        client.init().collection("users")
            .where(firebase.firestore.FieldPath.documentId(), "==", authId)
            .get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    dispatch(authUser(doc))
                })
            })

        client.getQuestions().then((snapshot) => {
            const questions = []
            snapshot.forEach((doc) => {
                questions.push(mapQuestion(doc))
            })
            
            dispatch(receiveQuestions(questions))
        })

        client.getLeaderboardEntries().then((snapshot) => {
            const entries = []

            snapshot.forEach((doc) => {
                const entry = {
                    id: doc.id,
                    name: `${doc.data().firstName} ${doc.data().lastName}`,
                    answeredQuestions: doc.data().answeredQuestionsCount,
                    createdQuestions: doc.data().createdQuestions,
                    totalScore: doc.data().answeredQuestionsCount + doc.data().createdQuestions
                }

                entries.push(entry)
            })

            dispatch(receiveEntries(entries))
        })
    }
}

function mapQuestion(doc) {
    return {
        id: doc.id,
        firstOption: doc.data().firstOption,
        secondOption: doc.data().secondOption,
        firstOptionVotes: doc.data().firstOptionVotes,
        secondOptionVotes: doc.data().secondOptionVotes,
        creatorName: doc.data().creatorName,
        timestamp: doc.data().timestamp,
    }
}