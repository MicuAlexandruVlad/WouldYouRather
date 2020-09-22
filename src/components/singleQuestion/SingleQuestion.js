import React, { Component } from 'react'
import './SingleQuestion.scss'
import Question from '../../shared/components/question/Question'
import { connect } from 'react-redux'

class SingleQuestion extends Component {
    render() {
        return (
            <div className="sq-body">
                
            </div>
        )
    }
}

const mapState = appState => {
    return {
        user: appState.users
    }
}

export default connect(mapState)(SingleQuestion)