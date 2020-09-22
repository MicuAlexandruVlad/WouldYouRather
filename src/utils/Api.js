import firebase from 'firebase'

export default class Api {
    init() {
        var firebaseConfig = {
            apiKey: "AIzaSyApd2bCsBGic2nWc7P4ZZAGZsczrUIWl3I",
            authDomain: "wouldyourather-39e5d.firebaseapp.com",
            databaseURL: "https://wouldyourather-39e5d.firebaseio.com",
            projectId: "wouldyourather-39e5d",
            storageBucket: "wouldyourather-39e5d.appspot.com",
            messagingSenderId: "333187620704",
            appId: "1:333187620704:web:7590b9613128dc42e8c805",
            measurementId: "G-6GQF57SFE1"
          };
          // Initialize Firebase
          
        if (!firebase.apps.length) {
            let app = firebase.initializeApp(firebaseConfig)
            return app.firestore()
        }
          
        return firebase.firestore()
    }

    getQuestions() {
        return this.init().collection("questions").orderBy("timestamp", "desc").get()
    }

    insertQuestion(question) {
        return this.init().collection("questions").add(question)
    }

    updateQuestion(question) {
        this.init().collection("questions").doc(question.id).set({
            firstOptionVotes: question.firstOptionVotes,
            secondOptionVotes: question.secondOptionVotes,
            creatorName: question.creatorName,
            firstOption: question.firstOption,
            secondOption: question.secondOption,
            timestamp: question.timestamp,
        })
        .then(() => {
            console.log('Question updated in firestore')
        })
    }

    updateUser(user) {
        this.init().collection("users").doc(user.id).set({
            answeredQuestions: user.answeredQuestions,
            answeredQuestionsCount: user.answeredQuestionsCount,
            createdQuestions: user.createdQuestions,
            pickedOptions: user.pickedOptions,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        })
        .then(() => {
            console.log('User updated in firestore')
        })
    }

    getLeaderboardEntries() {
        return this.init().collection("users").get()
    }
}