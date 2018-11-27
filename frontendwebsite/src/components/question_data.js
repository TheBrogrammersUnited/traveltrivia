import React, {Component} from 'react';

class questionData extends Component{

	constructor(props){
		super(props);
		let index=0;
		let questionArray = [];
		// let answerArray = [];

		props.questionData.map((props) => {
			questionArray.push(props);
			
		});
		 
		
		this.state = {
			questionArray :questionArray,
			index: index,
			correctCount: 0,
			incorrectCount: 0,
			// answerArray2 : answerArray[index],
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

		let answerArray=this.shuffle([this.state.questionArray[this.state.index].correct_answer,
										this.state.questionArray[this.state.index].incorrect_answers[0],
										this.state.questionArray[this.state.index].incorrect_answers[1],
										this.state.questionArray[this.state.index].incorrect_answers[2]]);
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
											if (this.state.questionArray[this.state.index].correct_answer  ===  answerArray[0])
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
											



		
										}
									}		
					>
						{answerArray[0]}
					</button>

					<button 
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick = 	{ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer  ===  answerArray[1])
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


											}
										}
									}		
					>
						{answerArray[1]}
					</button><br/>

					<button 
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick = 	{ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer  ===  answerArray[2])
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


											}
										}
									}		
					>
						{answerArray[2]}
					</button>

					<button 
						className = 'bg-white dib br3 ba bw1 pa3 ma2 grow' 
						onClick = 	{ () =>
										{
											if (this.state.questionArray[this.state.index].correct_answer ===  answerArray[3])
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

											}
										}
									}		
					>
						{answerArray[3]}
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