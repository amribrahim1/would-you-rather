import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
    state =  {
        board: []
    }
    
    componentDidMount() {
        let board = [];
        let count = {};
        for (var l in this.props.users) {
            count[l]= {
                answers: 0,
                questions: this.props.users[l].questions.length
            }
            for (var k in this.props.users[l].answers) {
                
                if (this.props.users[l].answers.hasOwnProperty(k)) {
                    count[l].answers ++;
                }
            }
            board.push({
                user: this.props.users[l],
                answers: count[l].answers,
                questions: count[l].questions,
                score: count[l].answers+count[l].questions
            })
        }
        this.setState({board})
    }
      
    render() {
        return (
            <div>
                {this.state.board.sort((a, b) => b.score-a.score).map(user => 
                    <div className="card board-card mt-2 mb-3 m-auto p-2" style={{maxWidth: '540px'}} key={user.user.id}>
                        <i className="cup fas fa-medal"></i>
                        <div className="row g-0">
                            <div className="col-md-3">
                                <img width="100" style={{borderRadius: '50%'}} src={user.user.avatarURL===''? "https://firebasestorage.googleapis.com/v0/b/test-task-caf19.appspot.com/o/would%20you%20rather%2Favatar.png?alt=media&token=1dcdaf5e-b089-4500-860b-180235d257a5" : user.user.avatarURL} alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body text-start">
                                    <h4 className="card-title fw-bolder mb-2">{user.user.name}</h4>
                                    <div className="row">
                                        <div className="col-9">
                                            <p>Answered Questions</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{user.answers}</p>
                                        </div>
                                    </div>
                                    <hr style={{color: "rgb(200, 200, 200)"}}/>
                                    <div className="row">
                                        <div className="col-9">
                                            <p>Created Questions</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{user.questions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-header">
                                        <h6>Score</h6>
                                    </div>
                                    <span className="score-badge badge bg-info fw-bolder">{user.score}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}           
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
	return {
        users
	}
}

export default connect(mapStateToProps)(LeaderBoard);