import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'

export default class Nav extends Component{

	constructor(props) {
    super(props);
    this.state = {
			menuState:''
		};
	}

	componentWillMount(){
		if(window.location.href.split('/')[window.location.href.split('/').length-1]==='login'){
			console.log(this.state.menuState);
			this.setState({
				menuState: this.state.menuState == '' ? 'hide-nav' : ''
			});
		}
	}

	render(){
		return(
			<div className={this.state.menuState}>
				<Link to="/" >Demo</Link>
				<Link to="/home">Demo2</Link>
			</div>
		)
	}

}
