import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Admin from './Admin'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/admin' component={Admin}/>
		</Switch>
	</main>
)

export default Main
