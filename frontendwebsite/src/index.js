
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import JSON from './dbt.json';
import NewsList from './components/news_list';
import 'tachyons';
//COMPONENTS: no javascript extensions needed but others are
import Header from './components/header';

// const App = () =>{
// 	console.log(JSON)
// 	//return React.createElement(element,object,what is gonna be inside element. It can also be another createElement function with another element passed in);
// 	//(this will do the same thing as follows) React.createElement('h1', {className: 'title'}, 'Hello, World!');
// 	return(
// 			<div>
// 				<Header/> 
// 			</div>
// 		)
// } 


class App extends Component{
	state={
		news: JSON
	}
	render(){
		return (
				<div>
					<Header/>
					<NewsList news={this.state.news}>
					
					</NewsList>

				</div>
			)
	}
}


ReactDOM.render(<App/>,document.querySelector('#root'));