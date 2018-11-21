import React from 'react';

const Question = ({question,category,difficulty}) => {

	return(
		<div className = ''>
			<div className = 'bg-white helvetica dib br4 ba bw1 pa3 ma2'>
				Category:  <br/> {category}
				
			</div>
			<div className = 'bg-white dib br4 ba bw1 pa3 ma2'>
				Difficulty: <br/> {difficulty}
				
			</div><br/>
			<div className = 'bg-white w-third dib br4 ba bw1 pa3 ma2'>
				{question}
			</div><br/>
		</div>
	);
}

export default Question;