import React, {Component} from 'react'
import { Switch, Route, hashHistory } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Portfolio from './Portfolio'
import Login from './Login'
import Admin from './Admin'
import Nav from './Nav'

export default class Main extends Component {

	render(){

		console.log(this.props);

		return (
			<main>
				<Nav />
				<Switch history={hashHistory}>
					<Route exact path='/' component={Home} />
				  <Route exact path='/about' component={About} />
					<Route exact path='/portfolio' component={Portfolio} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/admin' component={Admin} />
				</Switch>
			</main>
		)
	}
}
