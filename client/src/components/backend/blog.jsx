import React, { Component, PropTypes } from 'react'
import Foundation from 'react-foundation'
import RichTextEditor from 'react-rte'
import renderHTML from 'react-render-html'
import axios from 'axios'

export default class blog extends Component{
	//http://localhost:3001
	constructor(props){
		super(props);
		this.showMenu = this.showMenu.bind(this);
		this.saveBlog = this.saveBlog.bind(this);
		this.updateBlog = this.updateBlog.bind(this);
		this.deleteBlog = this.deleteBlog.bind(this);
	}

	static propTypes = {
		onChange: PropTypes.func,
		showMenu: PropTypes.func
	};

	state = {
		value: RichTextEditor.createEmptyValue(),
		showEdit: 'hide',
		blogDatas: []
	}

	onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
	}

	showMenu(){
		this.setState({
			showEdit: this.state.showEdit == 'hide' ? '' : 'hide'
		});
	}

	saveBlog(){
		let today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		let dateTime = date+' '+time;
		// alert(this.state.value.toString('html'));
		axios.post('/api/blog', {
			btitle: this.refs.titledata.value,
			bcontent: this.state.value.toString('html'),
			bdate: dateTime
		})
		.then(response => {
			if(response.data.status == 'success'){
				// alert('Saved!');
				this.refs.titledata.value = '';
				this.setState({value: RichTextEditor.createEmptyValue()});
				this.updateBlog();
			}else{
				alert('Failed..');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	updateBlog(){
		axios.get('/api/blog')
		.then((response) => {
			console.log(response.data);
			this.setState({
				blogDatas: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	deleteBlog(id){
		axios({
      method: 'delete',
      url: '/api/blog',
      data: {
        id,
      }
    })
    .then(response => {
      	if(response.data.status == 'success'){
					this.updateBlog();
				}else{
					alert('Failed..');
				}
    })
    .catch(err => {
      console.error(new Error(err))
      store.dispatch(receiveDataFailed())
    })
	}

	componentWillMount(){
		this.updateBlog();
	}

	render(){

		return (
			<div className="blog-template">
				<h1>BLOG</h1>
				<div className="action-bar">
					<p onClick={this.showMenu}><i className="fa fa-plus-circle" aria-hidden="true"></i> New Blog</p>
				</div>
				<div className={"action-blog " + this.state.showEdit}>
					<input ref="titledata" type="text" placeholder="Title" maxLength="100" required />
					<RichTextEditor
						value={this.state.value}
						onChange={this.onChange}
					/>
					<button className="post" onClick={this.saveBlog}>POST BLOG</button>
				</div>
				<div className="blog-content">
					{
						this.state.blogDatas.map((data, index) => {
							return (
								<div key={index} className="blog-ad-style">
									<h3>{data.btitle}</h3>
									<div>{renderHTML(data.bcontent)}</div>
									<p>{data.bdate}</p>
									<hr />
									<i onClick={()=>{ this.deleteBlog(data._id) }} className="fa fa-trash" aria-hidden="true"></i>
									<i className="fa fa-pencil-square" aria-hidden="true"></i>
								</div>
							)
						})
					}
					{/* <div className="blog-ad-style">
						<h3>Blog 1</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						<p>- Delete Blog</p>
					</div> */}
				</div>
			</div>
	)}
}
