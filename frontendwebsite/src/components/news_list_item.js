//video 16
	// import React from 'react';
	// import { css } from 'glamor';

	// //instead of (props) we can do ({item}) this is called destructuring
	// //props is a big object and we only need items from props and not the whole props

	// const NewsItem = ({item}) => {
	// 	let news_item = css({
	// 		padding: '20px',
	// 		boxSizing: 'border-box',
	// 		borderBottom: '1px solid grey',
	// 		':hover':{
	// 			color:'red'
	// 		},
	// 		'@media(max-width: 1000px)':{
	// 			color:'blue'
	// 		}
	// 	}) 
	// 	let item_grey = css({
	// 		background: 'lightgrey'
	// 	})
	// 	return(
	// 		<div className={`${news_item} ${item_grey}`}>
	// 			<h3>{item.title}</h3>
	// 			<div>
	// 				{item.feed}
	// 			</div>
	// 		</div>
	// 	)
	// }

	// export default NewsItem;
//video 17
import React from 'react';
//assigning a name to the css import
import classes from '../css/styles.css'
import Question from './question';
import Answer from './answers';



//recommended to do version control because after changing the
//configuration of your app, you cannot go back to the previous one
const NewsItem = ({item}) => {
	return(
		<div>
			<Question
				question={item.question}
				category={item.category}
				difficulty = {item.difficulty}
			/>
			<Answer 
				correctAnswer = {item.correct_answer}
				incorrectAnswers = {item.incorrect_answers}
			/>

		</div>
	)
}

export default NewsItem;
