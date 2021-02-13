import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestion, saveQuestionAnswer  } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (info) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestion(info)
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

function answerQuestion ({ authedUser, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleAnswerQuestion (info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer(info)
        .then(() => dispatch(answerQuestion(info)))
        .then(() => dispatch(hideLoading()))
        .catch( (e) => {
            console.log('The was an error answering the question. Try again.', e);
        })
    }
}