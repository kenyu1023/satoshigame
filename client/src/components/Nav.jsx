import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/index.scss'
import Home from './Home'

export default class Nav extends Component{

	constructor(props) {
    super(props);
    this.state = {
			menuState:''
		};
	}

	componentWillMount(){
		if(window.location.href.split('/')[window.location.href.split('/').length-1]==='login'||window.location.href.split('/')[window.location.href.split('/').length-1]==='admin'){
			this.setState({
				menuState: this.state.menuState == '' ? 'hide-nav' : ''
			});
		}
	}

	render(){
		return(
			<div className={this.state.menuState}>
				<div className="nav">
					<Link onClick={()=>{this.props.loadingStart()}} to="/">Home</Link>
					<Link onClick={()=>{this.props.loadingStart()}} to="/about">About</Link>
					<Link onClick={()=>{this.props.loadingStart()}} to="/portfolio">Portfolio</Link>
					<Link onClick={()=>{this.props.loadingStart()}} to="/blog">Blog</Link>
				</div>
			</div>
		)
	}
}
