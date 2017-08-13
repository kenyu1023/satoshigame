import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

export default class Admin extends Component{

	render(){
		const Button = withRouter(({ history}) => (
			<button type='button' onClick={() => {
				history.push('/login');
					{/* axios.post('http://localhost:3001/api/users', {
						name: this.refs.nameinput.value,
						upassword: this.refs.passinput.value
					})
					.then(function (response) {
						if(response.data.status != 'nodata'){
							history.push(response.data.status);
						}else{
							alert('Password or Username is not correct.');
						}
					})
					.catch(function (error) {
						console.log(error);
					}); */}
				}} >
				LOGOUT
			</button>
		))

		return(
			<div className="login-bg">
				<div className="login-style">
					<h3>WELCOME!</h3>
					<Button />
				</div>
			</div>
		)
	}

}
