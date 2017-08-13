import React, {Component} from 'react'
import { Switch, Route, hashHistory } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Login from './Login'
import Nav from './Nav'

export default class Main extends Component {
	render(){
		return (
			<main>
				<Nav />
				<Switch history={hashHistory}>
					<Route exact path='/' component={Home} />
				  <Route exact path='/about' component={About} />
					<Route exact path='/login' component={Login} hideNav={this.hideNavigation}/>
				</Switch>
			</main>
		)
	}
}
