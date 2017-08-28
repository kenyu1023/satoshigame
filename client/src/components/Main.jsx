import React, {Component} from 'react'
import { Switch, Route, browserHistory} from 'react-router'
import Home from './Home'
import About from './About'
import Portfolio from './Portfolio'
import Blog from './Blog'
import Login from './Login'
import Admin from './Admin'
import Nav from './Nav'

export default class Main extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading: 'hide'
		}

		this.loadingShow = this.loadingShow.bind(this);
		this.loadingStart = this.loadingStart.bind(this);
	}

	loadingShow(){
		if(this.state.loading==''){
			this.setState({
				loading: 'hide'
			});
		}
	}

	loadingStart(){
		if(this.state.loading!=''){
			this.setState({
				loading: ''
			});
		}
	}

	render(){

		return (
			<main>
				<Nav loadingStart={this.loadingStart} />
				<Switch history={browserHistory}>
					<Route exact path='/' component={() => <Home loading={this.loadingShow}/>} />
				  <Route exact path='/about' component={() => <About loading={this.loadingShow}/>} />
					<Route exact path='/portfolio' component={() => <Portfolio loading={this.loadingShow}/>} />
					<Route exact path='/blog' component={() => <Blog loading={this.loadingShow}/>} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/admin' component={Admin} />
				</Switch>
				<div className={"loading-section " + this.state.loading} >
					<img src={require("../../satoshigame/loading.gif")} />
				</div>
			</main>
		)
	}
}
