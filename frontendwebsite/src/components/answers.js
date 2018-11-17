import React from 'react';

function shuffle(a) {
	for (let i = a.length -1;i>0;i--){
		const j = Math.floor(Math.random()*(i+1));
		[a[i],a[j]] = [a[j],a[i]];
	}
	return a;
}


const Answer = ({correctAnswer,incorrectAnswers}) => {
	const answerArray = [correctAnswer,incorrectAnswers[0],incorrectAnswers[1],incorrectAnswers[2]]
	const answerArray2 = shuffle(answerArray);
	return(
		<div className = 'answersClass'>
			<div className = 'bg-light-red dib br3 pa3 ma2 grow'>
				{answerArray2[0]}
			</div><br/>
			<div className = 'bg-light-red dib br3 pa3 ma2 grow'>
				{answerArray2[1]}
			</div><br/>
			<div className = 'bg-light-red dib br3 pa3 ma2 grow'>
				{answerArray2[2]}
			</div><br/>
						<div className = 'bg-light-red dib br3 pa3 ma2 grow'>
				{answerArray2[3]}
			</div>

		</div>
	);
}

export default Answer;