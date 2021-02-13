import React, { Component } from 'react';
import Question from './Question';

class ListQuestions extends Component {
    render() {
        return (
            <div>
                {this.props.questions.sort((a, b) => b.timestamp-a.timestamp).map(q =>
                    <Question key={q.id} question= {q}/> 
                ) }
            </div>
        )
    }
}

export default ListQuestions;