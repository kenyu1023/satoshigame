import React, { Component } from 'react'

export default class Admin extends Component{

	render(){

		const checkUser = () => {
			console.log('Login!')
		}

		return(
			<div className="admin-bg">
				<h3>WELCOME!</h3>
			</div>
		)
	}

}
