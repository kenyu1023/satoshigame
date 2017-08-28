import React, { Component } from 'react'
import Foundation from 'react-foundation'
import ReactQuill from 'react-quill'
import renderHTML from 'react-render-html'
import firebase from 'firebase'
import axios from 'axios'
import theme from 'react-quill/dist/quill.snow.css'
import FileUploader from 'react-firebase-file-uploader'

class blog extends Component{
	//http://localhost:3001
	constructor(props){
		super(props);

		this.state = {
			actionMode: 0,
			text: '',
			blogDatas: [],
			insertImage:[],
			username: '',
			avatar: '',
			isUploading: false,
			progress: 0,
			avatarURL: '',
			blogModal: 'hidemodal'
		}

		this.closeBlogModal = this.closeBlogModal.bind(this);
    this.handleChange = this.handleChange.bind(this)
		this.editBlogChange = this.editBlogChange.bind(this);
		this.saveBlog = this.saveBlog.bind(this);
		this.updateBlog = this.updateBlog.bind(this);
		this.deleteBlog = this.deleteBlog.bind(this);
		this.imageHandler= this.imageHandler.bind(this);

		this.updateBlog();
	}

	handleChange(value) {
    this.setState({ text: value })
  }

	getAttrFromString(str, node, attr) {
    var regex = new RegExp('<' + node + ' .*?' + attr + '="(.*?)"', "gi"), result, res = [];
    while ((result = regex.exec(str))) {
        res.push(result[1]);
    }
    return res;
	}

	saveBlog(){
		let today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		let dateTime = date;
		// alert(this.state.value.toString('html'));
		if(this.state.text.trim() != "" && this.refs.titledata.value != ""){
			if(this.state.actionMode == -1){
				axios.post('http://localhost:3001/api/blog', {
					btitle: this.refs.titledata.value,
					bcontent: this.state.text,
					bimage: this.state.insertImage,
					bdate: dateTime
				})
				.then(response => {
					if(response.data.status == 'success'){
						this.refs.titledata.value = '';
						this.setState({text: '', insertImage: []});
						this.updateBlog();
						this.closeBlogModal();
					}else{
						alert('Failed..');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}else{
				axios.put('http://localhost:3001/api/blog', {
					id: this.state.actionMode,
					btitle: this.refs.titledata.value,
					bcontent: this.state.text,
					bimage: this.state.insertImage
				})
				.then(response => {
					if(response.data.status == 'success'){
						this.updateBlog();
						this.closeBlogModal();
					}else{
						alert('Failed..');
					}
				})
				.catch(err => {
					console.error(new Error(err))
				})
			}
		}else{
			alert('Title or content is empty');
		}
	}

	updateBlog(){
		axios.get('http://localhost:3001/api/blog')
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

	editBlogChange(index){
		// console.log(index);
		if(index == -1){
			this.refs.reactQuill.getEditor().setText('');
			this.refs.titledata.value='';
			this.state.actionMode = -1;
		}else{
			this.state.actionMode = this.state.blogDatas[index]._id;
			this.refs.titledata.value = this.state.blogDatas[index].btitle;
			this.refs.reactQuill.getEditor().clipboard.dangerouslyPasteHTML(this.state.blogDatas[index].bcontent,'silent');
		}
		this.setState({
			blogModal: ""
		});
	}

	closeBlogModal(){
		this.setState({
			blogModal: "hidemodal"
		});
	}

	deleteBlog(id, index){
		axios({
      method: 'delete',
      url: 'http://localhost:3001/api/blog',
      data: {
        id,
      }
    })
    .then(response => {
      	if(response.data.status == 'success'){

					for(var i = 0; i < this.state.blogDatas[index].bimage.length; i++){
						var desertRef = firebase.storage().ref('satoshigame/blog').child(this.state.blogDatas[index].bimage[i]);
						desertRef.delete().then(function() {
							// console.log('deleted!');
						}).catch(function(error) {
							console.log(error);
						})
					}

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

	handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
		// console.log(filename);
		this.state.insertImage.push(filename);
		this.setState({
			insertImage: this.state.insertImage
		});
    this.setState({avatar: filename, progress: 100, isUploading: false});
		firebase.storage().ref('satoshigame/blog').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url},
			() => {
				if(this.refs.reactQuill.getEditor().getSelection()!=null){
					let cursorPosition = this.refs.reactQuill.getEditor().getSelection().index;
					this.refs.reactQuill.getEditor().insertEmbed(cursorPosition, 'image', this.state.avatarURL , "user");
					this.refs.reactQuill.getEditor().setSelection(cursorPosition + 1);
				}else{
					this.refs.reactQuill.getEditor().insertEmbed(0, 'image', this.state.avatarURL , "user");
					this.refs.reactQuill.getEditor().setSelection(1);
				}
				document.getElementById('imageselect').value ="";
			}
		));
	};

	imageHandler(){
		document.getElementById('imageselect').click();
	}



	render(){

		const modules = {
			formula: true,
      toolbar: {
				container: [[{ 'header': [1, 2, false] }],
				['bold', 'italic', 'underline','strike', 'blockquote'],
				[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{'align': 'center'},{'align': 'right'},{'align': 'justify'}],
				['link','image'],
				['clean']],
				handlers: {
						'image': this.imageHandler
				}
			},
			clipboard: {
				matchVisual: false
			}
		}

		const formats= [
			'header',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent','align',
			'link','image'
		]

		return (
			<div className="blog-template">
				<h1>BLOG</h1>
				<div className="action-bar">
					<p onClick={()=>{this.editBlogChange(-1)}}><i className="fa fa-plus-circle" aria-hidden="true"></i> New Blog</p>
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
									<i onClick={()=>{ this.deleteBlog(data._id, index) }} className="fa fa-trash" aria-hidden="true"></i>
									<i onClick={()=>{this.editBlogChange(index)}} className="fa fa-pencil-square" aria-hidden="true"></i>
								</div>
							)
						})
					}
				</div>
				<div className={"admin-modalboxblog " + this.state.blogModal}>
					<div className={"action-blog"}>
						<h1>Edit Blog</h1>
						<FileUploader className="hidden-class" id="imageselect"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={firebase.storage().ref('satoshigame/blog')}
							onUploadStart={this.handleUploadStart}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						<input ref="titledata" type="text" placeholder="Title" maxLength="100" required />
						<ReactQuill ref="reactQuill" theme="snow" modules={modules}
											formats={formats} value={this.state.text}
										onChange={this.handleChange} />
						<button className="post" onClick={this.saveBlog}>POST BLOG</button>
						<button className="post" onClick={this.closeBlogModal}>CANCEL</button>
					</div>
				</div>
			</div>
	)}
}

export default blog;
