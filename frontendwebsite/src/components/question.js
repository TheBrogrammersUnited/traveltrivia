import React from 'react';

const Question = ({question}) => {

	return(
		<div  >
			<div className = 'bg-light-red dib br3 pa3 ma2 grow'>
				{question}
			</div><br/>
		</div>
	);
}

export default Question;