import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';

class QuestionSubmit extends Component {
    state = {
        answer: ''
    }
    
    handleChange = (e) => {
        const answer = e.target.value

        this.setState(() => ({
            answer,
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { answer } = this.state
        const { dispatch, authedUser, question } = this.props
        
        dispatch(handleAnswerQuestion({authedUser, qid: question.id, answer}))
    }

    render() {
        const question = this.props.question;
        return (
            <div className="card mb-3 m-auto" style={{maxWidth: '540px'}}>
                <div className="card-header text-start"><h6 className="fw-bolder">{this.props.name} asks:</h6></div>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img width="150" style={{borderRadius: '50%'}} src={this.props.autorAvatar} alt={this.props.name} />
                    </div>
                    <div className="col-md-8">
                        <form className="card-body text-start" onSubmit={this.handleSubmit}>
                            <h4 className="card-title mb-3">Would You Rather ...</h4>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="option" id="optionOne" value="optionOne" onChange={this.handleChange} required/>
                                <label className="form-check-label" htmlFor="optionOne">
                                    {question.optionOne.text}
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="option" id="optionTwo" value="optionTwo" onChange={this.handleChange} required/>
                                <label className="form-check-label" htmlFor="optionTwo">
                                    {question.optionTwo.text}
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
	return {
        authedUser: authedUser,
        question: questions[props.id],
        autorAvatar: users[authedUser].avatarURL === ''? "https://firebasestorage.googleapis.com/v0/b/test-task-caf19.appspot.com/o/would%20you%20rather%2Favatar.png?alt=media&token=1dcdaf5e-b089-4500-860b-180235d257a5" : users[authedUser].avatarURL,
        name: users[questions[props.id].author].name
	}
}

export default connect(mapStateToProps)(QuestionSubmit);