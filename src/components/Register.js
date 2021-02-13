import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddUser } from '../actions/users';
import { handlesetAuthedUser } from '../actions/authedUser';

class Register extends Component {
    state = {
        id: '',
        name: '',
        avatarURL: ''
    }

    handleChange = (e) => {
        let state = {...this.state}
        state[e.currentTarget.name] = e.currentTarget.value
        this.setState({
            id: state.id.trim(),
            name: state.name,
            avatarURL: state.avatarURL
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        let { id, name, avatarURL } = this.state
        dispatch(handleAddUser({id, name, avatarURL}))
        .then(() => dispatch(handlesetAuthedUser(id)))
        
    }
    
    render() {
        const { id, name, avatarURL } = this.state
        return (
            <form className="card text-center m-auto mt-2" style={{maxWidth:'540px'}} onSubmit={this.handleSubmit}>
                <div className="card-header"><h2>Register New User</h2></div>
                <div className="card-body text-start">
                    <div className="col-12 register-input mb-2">
                        <input className="form-control" type="text" name="id" placeholder="Enter Username (No spaces)" onChange={this.handleChange} value={id} required/>
                        <span className="required-indicator" role="presentation"></span>
                    </div>
                    <div className="col-12 register-input mb-2">
                        <input className="form-control" type="text" name="name" placeholder="Enter Display Name" onChange={this.handleChange} value={name} required/>
                        <span className="required-indicator" role="presentation"></span>
                    </div>
                    <input className="form-control" type="text" name="avatarURL" placeholder="Enter Your Avatar URL" onChange={this.handleChange} value={avatarURL}/>
                </div>
                <button className="form-control btn btn-primary" type="submit">Register</button>
            </form>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
	return {
        authedUser: authedUser
	}
}

export default connect(mapStateToProps)(Register)