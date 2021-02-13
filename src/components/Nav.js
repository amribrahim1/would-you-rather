import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handlesetAuthedUser } from '../actions/authedUser';

class Nav extends Component {
    logout = () => {
        const { dispatch } = this.props
        dispatch(handlesetAuthedUser(null))
        this.props.history.push('/')
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to='/' className="navbar-brand" activeClassName='active'>
                        Would You Rather
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/add' className="nav-link" activeClassName='active'>
                                    New Question
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/leaderboard' className="nav-link" activeClassName='active'>
                                    Leader Board
                                </NavLink>
                            </li>
                        </ul>
                        {this.props.authedUser === null
                            ? <NavLink to='/register' className="btn btn-secondary ms-2">Register</NavLink>
                            : <div>
                                <span className="navbar-text">Hello, {this.props.userName}</span>
                                <button className="btn btn-secondary ms-2" onClick={this.logout}>Logout</button>
                            </div>
                        }
                        
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
	return {
        authedUser: authedUser,
        userName: authedUser !== null && users[authedUser].name
	}
}

export default withRouter(connect(mapStateToProps)(Nav))