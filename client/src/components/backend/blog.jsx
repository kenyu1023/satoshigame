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
			text: '',
			showEdit: 'hide',
			blogDatas: [],
			insertImage:[],
			username: '',
			avatar: '',
			isUploading: false,
			progress: 0,
			avatarURL: ''
		}
    this.handleChange = this.handleChange.bind(this)

		this.showMenu = this.showMenu.bind(this);
		this.saveBlog = this.saveBlog.bind(this);
		this.updateBlog = this.updateBlog.bind(this);
		this.deleteBlog = this.deleteBlog.bind(this);
		this.imageHandler= this.imageHandler.bind(this);

		this.updateBlog();
	}

	handleChange(value) {
    this.setState({ text: value })
  }

	showMenu(){
		this.setState({
			showEdit: this.state.showEdit == 'hide' ? '' : 'hide'
		});
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
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		let dateTime = date+' '+time;
		// alert(this.state.value.toString('html'));
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
			}else{
				alert('Failed..');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	updateBlog(){
		axios.get('http://localhost:3001/api/blog')
		.then((response) => {
			// console.log(response.data);
			this.setState({
				blogDatas: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
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
					<p onClick={this.showMenu}><i className="fa fa-plus-circle" aria-hidden="true"></i> New Blog</p>
				</div>
				<div className={"action-blog " + this.state.showEdit}>
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

export default blog;
