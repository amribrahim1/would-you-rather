import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import QuestionSubmit from './QuestionSubmit';

class QuestionResults extends Component {
    render() {
        if (this.props.question === null) {
            return <Redirect to="/404"/>
        }
        const question = this.props.question;
        const votesNumber = question.optionOne.votes.length + question.optionTwo.votes.length;
        const width1 = {
            width: `${question.optionOne.votes.length/votesNumber*100}%`,
        };
        const width2 = {
            width: `${question.optionTwo.votes.length/votesNumber*100}%`,
        };
        if ( !question.optionOne.votes.includes(this.props.authedUser) && !question.optionTwo.votes.includes(this.props.authedUser) ) {
            return (
                <QuestionSubmit id={this.props.match.params.id}/>
            )
        }
        return (
            <div className="card mb-3 m-auto" style={{maxWidth: '540px'}}>
                <div className="card-header text-start"><h6 className="fw-bolder">Asked by: {this.props.name}</h6></div>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img width="150" style={{borderRadius: '50%'}} src={this.props.autorAvatar} alt={this.props.name} />
                    </div>
                    <div className="col-md-8">
                        <h4 className="fw-bolder text-start" >Results:</h4>
                        <div className="card-body text-start">
                            <div className="card result-card">
                                {question.optionOne.votes.includes(this.props.authedUser)
                                    ? <span className="vote-badge badge bg-warning fw-bolder">Your Vote</span>
                                    : <span></span>
                                }
                                <div className="card-body" style={question.optionOne.votes.includes(this.props.authedUser)?{backgroundColor: "rgb(232 253 253)"}:{}}>
                                    <h6>Would you rather {question.optionOne.text}?</h6>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={width1} aria-valuenow={width1.width} aria-valuemin="0" aria-valuemax="100">{width1.width}</div>
                                    </div>
                                    <p className="text-center">{question.optionOne.votes.length} out of {votesNumber} votes</p>
                                </div>
                            </div><br/>
                            <div className="card result-card">
                                {question.optionTwo.votes.includes(this.props.authedUser)
                                    ? <span className="vote-badge badge bg-warning fw-bolder">Your Vote</span>
                                    : <span></span>
                                }
                                <div className="card-body" style={question.optionTwo.votes.includes(this.props.authedUser)?{backgroundColor: "rgb(232 253 253)"}:{}}>
                                    <h6>Would you rather {question.optionTwo.text}?</h6>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={width2} aria-valuenow={width2.width} aria-valuemin="0" aria-valuemax="100">{width2.width}</div>
                                    </div>
                                    <p className="text-center">{question.optionTwo.votes.length} out of {votesNumber} votes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    
function mapStateToProps ({ authedUser, questions, users }, props) {
    if (questions[props.match.params.id]) {
        return {
            questions: questions,
            authedUser: authedUser,
            question: questions[props.match.params.id],
            autorAvatar: users[authedUser].avatarURL === ''? "https://firebasestorage.googleapis.com/v0/b/test-task-caf19.appspot.com/o/would%20you%20rather%2Favatar.png?alt=media&token=1dcdaf5e-b089-4500-860b-180235d257a5" : users[authedUser].avatarURL,
            name: users[questions[props.match.params.id].author].name
        }
    } else {
        return {question: null}
    }
}

export default connect(mapStateToProps)(QuestionResults)