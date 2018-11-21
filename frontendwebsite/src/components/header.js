import React, {Component} from 'react';
import '../css/styles.css'
import logo from './logo.jpg'

class Header extends Component {
		state = { 
			keywords: ''
		}
		inputChangeHandler = (event)=>{
			const value = event.target.value === ''?'active':'non-active';
			this.setState({
				keywords: event.target.value
			})
		}
		render(){

			return(
				<header>
					
					<div>
						<img src={logo} height="100" length="100" />
					 </div>
				</header>
			)
		}
	}
	export default Header;
