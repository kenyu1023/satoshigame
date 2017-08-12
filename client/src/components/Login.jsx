import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export default class Admin extends Component{

	render(){

		const checkUser = () => {
			console.log('Login!');
		}

		const Button = withRouter(({ history}) => (
			<button type='button' onClick={() => { history.push('/admin') }} >
				ログインする
			</button>
		))

		return(
			<div className="login-bg">
				<div className="login-style">
					<h3>ログイン</h3>
					<input type="text" maxLength="20" placeholder="ユーザー名" required />
					<input type="password" maxLength="20" placeholder="パスワード" required />
					<Button />
				</div>
			</div>
		)
	}

}
