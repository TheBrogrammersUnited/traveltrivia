import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import JSON from './dbt.json';
import QuestionD from './components/question_data';
import 'tachyons';
import Header from './components/header';

class App extends Component{
	state={
		questionData: JSON
	}
	render(){
		return (
				<div>
					<Header/>
					<QuestionD questionData={this.state.questionData} >
					</QuestionD>

				</div>
			)
	}
}

ReactDOM.render(<App/>,document.querySelector('#root'));