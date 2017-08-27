import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Blog from './backend/blog'
import Works from './backend/works'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB6Vw0uLZy6Rnti4gvC813OqfAWG-dtqSE",
	authDomain: "websites-f7189.firebaseapp.com",
	databaseURL: "https://websites-f7189.firebaseio.com",
	projectId: "websites-f7189",
	storageBucket: "websites-f7189.appspot.com",
	messagingSenderId: "559381342157"
}
firebase.initializeApp(config);

export default class Admin extends Component{

	constructor(props){
		super(props);
		this.state= {
			selected: 'works',
			worksection: '',
			blogsection: 'hideright'
		}
		this.changeTemplate = this.changeTemplate.bind(this);
	}

	componentWillMount(){
		document.body.style.overflow = "hidden";
	}

	changeTemplate(template){
		if(template == "blog" ){
			this.setState({
				selected: template,
				worksection: 'hideleft',
				blogsection: ''
			});
		}else{
			this.setState({
				selected: template,
				worksection: '',
				blogsection: 'hideright'
			});

		}
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
				<i className="fa fa-sign-out" aria-hidden="true"></i>LOGOUT
			</p>
		))

		return(

			<div className="admin-bg">
				<div className="topBar"><p>Admin</p></div>
				{/* <Button /> */}
				<div className="sideBarLeft">
					<h2>GENERAL</h2>
					<hr />
					<p onClick={()=>{ this.changeTemplate('works')}}><i className="fa fa-file-image-o" aria-hidden="true"/>WORKS</p>
					<p onClick={()=>{ this.changeTemplate('blog')}}><i className="fa fa-rss" aria-hidden="true"/>BLOG</p>
					<h2>PROFILE</h2>
					<hr />
					<Button/>
				</div>
				<div className="spaceLeft"></div>
				<div className="sideBarRight">
					{/* {
						this.state.selected == 'works' ? (<Works />) : (<Blog />)
					} */}
					<div id="WorkSectionAdmin" className={'rightmode ' + this.state.worksection}>
						<Works />
					</div>
					<div id="BlogectionAdmin" className={'rightmode ' + this.state.blogsection}>
						<Blog />
					</div>
				</div>
			</div>
		)
	}

}
