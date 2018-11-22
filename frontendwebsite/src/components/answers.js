import React, {Component} from 'react';
import Question from './question';

class Answer extends Component{
	constructor(props){
		super(props);
		const answerArray = [props.correctAnswer,props.incorrectAnswers[0],props.incorrectAnswers[1],props.incorrectAnswers[2]]
		
		this.state = {
			correctCount: 0,
			incorrectCount: 0,
			answerArray2 : this.shuffle(answerArray)
		}
		
		this.resetCounter = this.resetCounter.bind(this);

		var mehadString = '' ;
	}

	// onClick(e, mehad){
	// 	if (this.props.correctAnswer ===  mehad)
	// 		{
	// 			this.setState({
	// 				correctCount: this.state.correctCount +1
	// 			})
	// 		}else{
	// 			this.setState({
	// 				incorrectCount: this.state.correctCount +1
	// 			})
	// 		}
	// }
	
	resetCounter(){
		this.setState({ 	
			correctCount: 0,
			incorrectCount: 0
		})
	}

	shuffle(a) {
		for (let i = a.length -1;i>0;i--){
			const j = Math.floor(Math.random()*(i+1));
			[a[i],a[j]] = [a[j],a[i]];
		}
		return a;
	}




	render(){

		return(
			<div >
				<div 
					className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
					onClick = 	{ () =>
									{
										if (this.props.correctAnswer ===  this.state.answerArray2[0])
										{
											this.setState({
												correctCount: this.state.correctCount +1
											})
										}else{
											this.setState({
												incorrectCount: this.state.incorrectCount +1
											})
										}
									}
								}		
				>
					{this.state.answerArray2[0]}
				</div>

				<div 
					className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
					onClick = 	{ () =>
									{
										if (this.props.correctAnswer ===  this.state.answerArray2[1])
										{
											this.setState({
												correctCount: this.state.correctCount +1
											})
										}else{
											this.setState({
												incorrectCount: this.state.incorrectCount +1
											})
										}
									}
								}		
				>
					{this.state.answerArray2[1]}
				</div><br/>

				<div 
					className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
					onClick = 	{ () =>
									{
										if (this.props.correctAnswer ===  this.state.answerArray2[2])
										{
											this.setState({
												correctCount: this.state.correctCount +1
											})
										}else{
											this.setState({
												incorrectCount: this.state.incorrectCount +1
											})
										}
									}
								}		
				>
					{this.state.answerArray2[2]}
				</div>

				<div 
					className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
					onClick = 	{ () =>
									{
										if (this.props.correctAnswer ===  this.state.answerArray2[3])
										{
											this.setState({
												correctCount: this.state.correctCount +1
											})
										}else{
											this.setState({
												incorrectCount: this.state.incorrectCount +1
											})
										}
									}
								}		
				>
					{this.state.answerArray2[3]}
				</div><br/>


				

				
				<div className = 'bg-dark-green dib br3 ba bw1 pa3 ma2 '>
					{this.state.correctCount}
				</div>
				<div className = 'bg-dark-red dib br3 ba bw1 pa3 ma2 '>
					{this.state.incorrectCount}
				</div>
			</div>
		);
	}


}
export default Answer;