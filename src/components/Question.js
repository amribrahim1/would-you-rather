import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const { authorName, authorAvatar, id } = this.props.question
        const optionOne = this.props.question.optionOne.text
        const optionTwo = this.props.question.optionTwo.text
        return (
            <div className="card mb-3 m-auto" style={{maxWidth: '540px'}}>
                <div className="card-header text-start"><h6 className="fw-bolder">{authorName} asks:</h6></div>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img width="150" style={{borderRadius: '50%'}} src={authorAvatar===""?"https://firebasestorage.googleapis.com/v0/b/test-task-caf19.appspot.com/o/would%20you%20rather%2Favatar.png?alt=media&token=1dcdaf5e-b089-4500-860b-180235d257a5":authorAvatar} alt={authorName} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-start">
                            <h4 className="card-title">Would You Rather ...</h4>
                                <p>{optionOne}</p>
                                <p>{optionTwo}</p>
                            <Link to={`/questions/${id}`} className="btn btn-outline-primary">View Poll</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;