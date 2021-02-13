import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: ''
    }
    
    handleChange = (e) => {
        let state = {...this.state}
        state[e.currentTarget.name] = e.currentTarget.value
        this.setState(state)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch, authedUser } = this.props
        
        dispatch(handleAddQuestion({author: authedUser, optionOneText, optionTwoText}))
        .then(() => this.props.history.push('/'))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: ''
        }))
    }
    
    render() {
        return (
            <form className="card text-center m-auto mt-2" style={{maxWidth:'540px'}} onSubmit={this.handleSubmit}>
                <div className="card-header"><h2>Create New Question</h2></div>
                <div className="card-body text-start">
                    <p className="mb-3">Complete The Question:</p>
                    <h5>Would you rather ...</h5>
                    <input className="form-control" type="text" name="optionOneText" placeholder="Enter Option One text Here" aria-label="default input example" onChange={this.handleChange} value={this.state.optionOneText}/>
                    <h6 className="text-center">OR</h6>
                    <input className="form-control" type="text" name="optionTwoText" placeholder="Enter Option Two text Here" aria-label="default input example" onChange={this.handleChange} value={this.state.optionTwoText}/><br/>
                    <button className="form-control btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
	return {
        authedUser: authedUser
	}
}

export default withRouter(connect(mapStateToProps)(NewQuestion));