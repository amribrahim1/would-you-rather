import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handlesetAuthedUser } from '../actions/authedUser';

class SignIn extends Component {
    state = {
        user: ''
    }

    handleChange = (e) => {
        const user = e.target.value

        this.setState(() => ({
            user,
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { user } = this.state
        const { dispatch } = this.props
        
        dispatch(handlesetAuthedUser(user))

    }

    render() {
        let users = Object.keys(this.props.users);
        return (
            <div className="card m-auto text-center fw-bolder mt-2" style={{maxWidth:"540px"}}>
                <div className="card-header">
                    <h4>Welcome to the Would You Rather app!<br/>
                        <small>Please sign in to continue</small>
                    </h4>
                </div>
                <div className="card-body">
                    <img src="https://apprecs.org/ios/images/app-icons/256/25/1210816293.jpg" alt="Welcome to the Would You Rather app!" /><br/><br/>
                    <h2 className="fw-bolder">Sign in</h2>
                    <form onSubmit={this.handleSubmit}>
                        <select className="form-select mb-2" aria-label="Default select example" name="user" onChange={this.handleChange} required>
                            <option value="">Select User</option>
                            {users.map(user => 
                                <option key={user} value={user}>{this.props.users[user].name}</option>
                            )}
                        </select>
                        <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Sign in</button>
                    </form>
                    <Link to="/register">Or register a new user</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
	return {
		users: users
	}
}

export default connect(mapStateToProps)(SignIn);