// import React from 'react';

//vid 5
	// const Header = () =>{
	// 	return <div>This is my new Header.</div>
	// }
//vid 6
	// const Header = () =>{
	// 	return <div> The date is {Date.now()} </div>
	// }

	// const getYear = () =>{
	// 	const newDate = new Date();
	// 	return newDate.getFullYear();
	// }
	// const Header = () =>{
	// 	return <div> The date is {
	// 		getYear()
	// 	} </div>
	// }

	// const Header = () =>{
	// 	return <div>The date is { 5+5 }</div>
	// }

	// const user = {
	// 	name: 'VeeJay',
	// 	lastname: 'Hoort',
	// 	age: 16
	// }

	// const Header = () =>{
	// 	return (
	// 	<div>
	// 		<div>{user.name}</div>
	// 		<div>{user.lastname}</div>
	// 		<div>{user.age}</div>
	// 	</div>
	// 	)
	// }
//vid 7
	// we need to turn the following into a class based component:
	// const Header = () => {
	// 	return(
	// 		<header>
	// 			<div>Logo </div>
	// 			<input type = "text" />
	// 		</header>
	// 	)
	// }

	//class based component (ES 5)
	
	// var header = {
	// 	render: function(){
	// 		return ''
	// 	}

	// }

	// class Header extends React.Component {
	// 	render(){
	// 		return(
	// 			<header>
	// 				<div>Logo </div>
	// 				<input type = "text" />
	// 			</header>
	// 		)
	// 	}
	// }

	//class based component (ES 6)

//this is called the destructuring:

//import must be files inside source folder and cannot be from inside public

//the destructuring is so we avoid doing React.Component everytime and instead just do Component
//this is the same as doing const Component = React.Component; // it is creating an alias for Component
	// class Header extends Component {

	// 	render(){

	// 		return(
	// 			<header>
	// 				<div 
	// 				className="logo"
	// 				//same as writin a function called click and calling it 
	// 				//in ES6 you can get rid of the curly bracecs that contain the function contet (here console.log)
	// 				onClick ={() => {console.log('I was clicked.')}}
	// 				>Logo </div>
	// 				<input type = "text" />
	// 			</header>
	// 		)
	// 	}
	// }

// 	class Header extends Component {
// 		//lets use the constructor to invoke the state and not just put the state right inside the class
// 		// constructor(props){
// 		// 	super(props)
// 		// 	//here we are adding the state to this constructor or prototype
// 		// 	this.state = {
// 		// 		keywords:'Hello'
// 		// 	}
// 		// } -> we dont usually use the constructor
// 		//if the state is changed the application will be re-rendered
// 		state = {
// 			title: 'The keywords are',
// 			keywords: ''
// 		}
// 		//we will set the state using the event handlers
// 		//the fat arrow function will eliminate the need for the .bind(this) down there next to inputChangeHandler
// 		inputChangeHandler = (event)=>{
// 			// instead of this: console.log(event.target.value) we will do this:
// 			//class components with states are hard to maintain and use lots of memory
// 			this.setState({
// 				keywords: event.target.value
// 			})
// 		}
// 		render(){
// 			console.log(this.state.keywords)
// //if we put this.inputChangeHandler() with the paranthesis inside the render function then it will be invoked w/o events 
// // everytime, but without the () then we are only referencing and any change will be only invoked by the onChange
// // besides, notice the inputChangeHandler function has a parameter passed inside when we igone () Onchange invokes the
// // event parameter passed inside the function.
// 			return(
// 				<header>
// 					<div className="logo">Logo </div>

// 					<input 
// 					type = "text" 
// 					onChange={this.inputChangeHandler}/>
// 					<div> {this.state.title}</div>
// 					<div> {this.state.keywords}</div>
// 				</header>
// 			)
// 		}
// 	}

// export default Header;

//video 16:
	// import React, {Component} from 'react';
	// import '../css/styles.css'

	// class Header extends Component {
	// 		state = {
	// 			active:'active',
	// 			keywords: ''
	// 		}
	// 		inputChangeHandler = (event)=>{
	// 			const value = event.target.value === ''?'active':'non-active;
	// 			this.setState({
	// 				active: value,
	// 				keywords: event.target.value
	// 			})
	// 		}
	// 		render(){
	// 			// const style ={
	// 			// 	background: 'red'
	// 			// }
	// 			// if (this.state.keywords !== ''){
	// 			// 	style.background = 'blue'
	// 			// }else{
	// 			// 	style.background ='red'
	// 			// }

	// 			return(
	// 				<header className = {this.state.active}>
	// 					<div  className="logo">Logo </div>

	// 					<input 
	// 					type = "text" 
	// 					onChange={this.inputChangeHandler}/>
	// 				</header>
	// 			)
	// 		}
	// 	}

	// export default Header;

//using libraries: (glamour)
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
