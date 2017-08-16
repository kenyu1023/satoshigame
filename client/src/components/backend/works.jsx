import React, { Component } from 'react'
import Foundation from 'react-foundation'
import firebase from 'firebase'
import axios from 'axios'

export default class works extends Component{
// http://localhost:3001
	constructor(props){
		super(props);

		this.state = {
			showEdit: 'hide',
			workDatas: [],
			isUploading: false,
			progress: 0,
			avatarURL: '',
			file: '',
			imagePreviewUrl: ''
		}

		this.updateWorks = this.updateWorks.bind(this);
		this.showMenu = this.showMenu.bind(this);
		this.saveWork = this.saveWork.bind(this);
		this.updateWorks = this.updateWorks.bind(this);
		this.imageHandler= this.imageHandler.bind(this);

		this.updateWorks();
	}

	saveWork(){
		// console.log(firebase.storage().ref().child('satoshigame/work/'+this.state.file.name));
		// if(firebase.storage().ref().child('satoshigame/work/'+this.state.file.name))
		firebase.storage().ref().child('satoshigame/work/'+this.state.file.name).put(this.state.file).then((snapshot) => {
			// console.log(snapshot.state);
			if(snapshot.state == 'success'){

				let today = new Date();
				let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				let dateTime = date+' '+time;
				// // wtitle, wurl, wfile, wembed, wicons, wcontent, wdate
				axios.post('/api/work', {
					wtitle: 'image',
					wurl: snapshot.downloadURL,
					wfile: this.state.file.name,
					wcontent: '',
					wdate: dateTime
				})
				.then(response => {
					if(response.data.status == 'success'){
						// console.log('success');
						this.updateWorks();
					}else{
						alert('Failed..');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		});
	}

	_handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

	showMenu(){
		this.setState({
			showEdit: this.state.showEdit == 'hide' ? '' : 'hide'
		});
	}

	updateWorks(){
		axios.get('/api/work')
		.then((response) => {
			console.log(response.data);
			this.setState({
				workDatas: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
		firebase.storage().ref('satoshigame/work').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}
		));
	};

	imageHandler(){
		document.getElementById('imageselect').click();
	}

	render(){
		return (
			<div className="works-template">
				<h1>WORKS</h1>
				<div className="action-bar">
					<p onClick={this.showMenu}><i className="fa fa-plus-circle" aria-hidden="true"></i> New Work</p>
				</div>
				<div className={"action-blog " + this.state.showEdit}>
					<input type="file"  ref="imageFile" onChange={(e)=>this._handleImageChange(e)} />
					<input ref="titledata" type="text" placeholder="Title" maxLength="100" required />
					{
						(this.state.imagePreviewUrl) ? (<img src={this.state.imagePreviewUrl} />):(<div className="previewText">Please select an Image for Preview</div>)
					}
					<button className="post" onClick={()=>{
						this.saveWork();
						}}>POST WORK</button>
				</div>
				<div className="works-content">
					{
						this.state.workDatas.map((data, index) => {
							return (
								<div className="imageWorkBolc" key={index}>
									<img src={data.wurl} />
								</div>
							)
						})
					}
				</div>
			</div>
	)}
}
