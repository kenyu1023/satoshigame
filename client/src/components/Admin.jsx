import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Blog from './backend/blog'
import Works from './backend/works'

export default class Admin extends Component{

	constructor(props){
		super(props);
		this.state= {
			selected: 'works'
		}

		this.changeTemplate = this.changeTemplate.bind(this);
	}

	changeTemplate(template){
		this.setState({
			selected: template
		});
	}

	render(){
		const Button = withRouter(({ history}) => (
			<p onClick={() => {
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
			</p>
		))

		return(
			<div className="admin-bg">
				<div className="topBar"><p>Admin</p></div>
				{/* <Button /> */}
				<div className="sideBarLeft">
					<h2>GENERAL</h2>
					<hr />
					<p onClick={()=>{ this.changeTemplate('works')}}>WORKS</p>
					<p onClick={()=>{ this.changeTemplate('blog')}}>BLOG</p>
					<h2>PROFILE</h2>
					<hr />
					<Button/>
				</div>
				<div className="spaceLeft"></div>
				<div className="sideBarRight">
					{
						this.state.selected == 'works' ? (<Works />) : (<Blog />)
					}
				</div>
			</div>
		)
	}

}
