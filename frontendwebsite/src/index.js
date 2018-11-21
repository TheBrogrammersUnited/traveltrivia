import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import JSON from './dbt.json';
import NewsList from './components/news_list';
import 'tachyons';
//COMPONENTS: no javascript extensions needed but others are
import Header from './components/header';

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