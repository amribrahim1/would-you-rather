import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Nav from "./Nav";
import Home from "./Home";
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import SignIn from './SignIn';
import Register from './Register';
import NotFound from './NotFound';
import QuestionResults from './QuestionResults';
import { handleInitialData } from '../actions/shared';

class App extends Component {
	componentDidMount() {
    	this.props.handleInitialData()
  	}
	
	render() {
		if (this.props.authedUser===null) {
			return (
				<Router>
					<Nav />
					<LoadingBar />
					{this.props.loading === true
						? null
						: <Switch>
								<Route path='/' exact component={SignIn} />
								<Route path='/register' component={Register} />
								<Redirect to='/'/>
							</Switch>

					}
				</Router>
			)
        }
		return (
			<Router>
				<Nav />
				<LoadingBar />
				{this.props.loading === true
					? null
					: <Switch>
						<Route path='/' exact component={() => 
							<Home
								questions={this.props.questions}
								users={this.props.users}
								authedUser={this.props.authedUser}
							/>
						} />
						<Route path='/add' component={NewQuestion} />
						<Route path='/leaderboard' component={LeaderBoard} />
						<Route path='/questions/:id' component={QuestionResults} />
						<Route path="/404" component={NotFound}/>
						<Redirect from="/register" to="/"/>
						<Redirect to="/404"/>
					</Switch>
				}
			</Router>
		)
	};
}

function mapDispatchToProps ({ users, questions, authedUser }) {
	return {
		users: users,
		questions: questions,
		authedUser: authedUser
	}
}
  
export default connect(mapDispatchToProps, { handleInitialData })(App);
