import React, {Component} from 'react';

class questionData extends Component{

	constructor(props){
		super(props);
		let index=0;
		let questionArray = [];
		props.questionData.map((props) => {
			questionArray.push(props);
		});
		let answerArray = [questionArray[index].correct_answer,questionArray[index].incorrect_answers[0],questionArray[index].incorrect_answers[1],questionArray[index].incorrect_answers[2]];
		
		this.state = {
			questionArray :questionArray,
			index: index,
			correctCount: 0,
			incorrectCount: 0,
			answerArray2 : this.shuffle(answerArray),
			correctAnswer :props.correctAnswer
		}
		
		this.resetCounter = this.resetCounter.bind(this);
	}

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
			<div>
				<div className = 'bg-white helvetica dib br4 ba bw1 pa3 ma2'>
					Category:  <br/> 
					{this.state.questionArray[this.state.index].category}
				</div>
				<div className = 'bg-white dib br4 ba bw1 pa3 ma2'>
					Difficulty: <br/> {this.state.questionArray[this.state.index].difficulty}
					
				</div><br/>
				<div className = 'bg-white w-third dib br4 ba bw1 pa3 ma2'>
					{this.state.questionArray[this.state.index].question}
				</div><br/>
			
				
					<button
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick ={ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer  ===  this.state.answerArray2[0])
											{
												this.setState({
													correctCount: this.state.correctCount +1
												})
											}else{
												this.setState({
													incorrectCount: this.state.incorrectCount +1
												})
											}
											this.setState({
											 	index : this.state.index+1
											})
this.answerArray = [this.state.questionArray[this.state.index].correct_answer,
this.state.questionArray[this.state.index].incorrect_answers[0],
this.state.questionArray[this.state.index].incorrect_answers[1],
this.state.questionArray[this.state.index].incorrect_answers[2]];

		
										}
									}		
					>
						{this.state.answerArray2[0]}
					</button>

					<button 
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick = 	{ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer  ===  this.state.answerArray2[1])
											{
												this.setState({
													correctCount: this.state.correctCount +1
												})
											}else{
												this.setState({
													incorrectCount: this.state.incorrectCount +1
												})
											this.setState({
											 	index : this.state.index+1
											})
this.answerArray = [this.state.questionArray[this.state.index].correct_answer,this.state.questionArray[this.state.index].incorrect_answers[0],this.state.questionArray[this.state.index].incorrect_answers[1],this.state.questionArray[this.state.index].incorrect_answers[2]];

											}
										}
									}		
					>
						{this.state.answerArray2[1]}
					</button><br/>

					<button 
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick = 	{ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer  ===  this.state.answerArray2[2])
											{
												this.setState({
													correctCount: this.state.correctCount +1
												})
											}else{
												this.setState({
													incorrectCount: this.state.incorrectCount +1
												})
											this.setState({
											 	index : this.state.index+1
											})
this.answerArray = [
	this.state.questionArray[this.state.index].correct_answer,
	this.state.questionArray[this.state.index].incorrect_answers[0],
	this.state.questionArray[this.state.index].incorrect_answers[1],
	this.state.questionArray[this.state.index].incorrect_answers[2]
];

											}
										}
									}		
					>
						{this.state.answerArray2[2]}
					</button>

					<button 
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick = 	{ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer ===  this.state.answerArray2[3])
											{
												this.setState({
													correctCount: this.state.correctCount +1
												})
											}else{
												this.setState({
													incorrectCount: this.state.incorrectCount +1
												})
											this.setState({
											 	index : this.state.index+1
											})
this.answerArray = [this.state.questionArray[this.state.index].correct_answer,this.state.questionArray[this.state.index].incorrect_answers[0],this.state.questionArray[this.state.index].incorrect_answers[1],this.state.questionArray[this.state.index].incorrect_answers[2]];

											}
										}
									}		
					>
						{this.state.answerArray2[3]}
					</button><br/>


					

					
					<div className = 'bg-dark-green dib br3 ba bw1 pa3 ma2 '>
						{this.state.correctCount}
					</div>
					<div className = 'bg-dark-red dib br3 ba bw1 pa3 ma2 '>
						{this.state.incorrectCount}
					</div>
			</div>
					// <NewsItem key = {questionArray[props.index].category} item={questionArray[props.index]} index = {index}>
					// </NewsItem>
				
		)
	}
}

export default questionData;
