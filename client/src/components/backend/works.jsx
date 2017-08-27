import React, { Component } from 'react'
import Foundation from 'react-foundation'
import firebase from 'firebase'
import axios from 'axios'

var timeout;

export default class works extends Component{
// http://localhost:3001
	constructor(props){
		super(props);

		this.state = {
			showEdit: 'hide',
			workDatas: [],
			categoriesDatas: [],
			isUploading: false,
			progress: 0,
			avatarURL: '',
			file: '',
			imagePreviewUrl: '',
			showEditCategory: 'hide'
		}

		this.updateWorks = this.updateWorks.bind(this);
		this.showMenu = this.showMenu.bind(this);
		this.showMenuCategory = this.showMenuCategory.bind(this);
		this.saveWork = this.saveWork.bind(this);
		this.updateWorks = this.updateWorks.bind(this);
		this.imageHandler= this.imageHandler.bind(this);

		this.updateWorks();
		this.updateCategory();
	}

	saveCategory(){
		axios.post('http://localhost:3001/api/category', {
			cname: 'image'
		})
		.then(response => {
			if(response.data.status == 'success'){
				console.log('success');
			}else{
				alert('Failed..');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	updateCategory(){
		axios.get('http://localhost:3001/api/category')
		.then((response) => {
			console.log(response.data);
			this.setState({
				categoriesDatas: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	deleteWork(id,nameImage){
		axios({
      method: 'delete',
      url: 'http://localhost:3001/api/work',
      data: {
        id,
      }
    })
    .then(response => {
			var desertRef = firebase.storage().ref('satoshigame/work').child(nameImage);
			desertRef.delete().then(() => {
				// console.log('deleted!');
				this.updateWorks();
			}).catch(function(error) {
				console.log(error);
			})
		});
	}

	saveWork(){

		firebase.storage().ref().child('satoshigame/work/'+this.state.file.name).put(this.state.file).then((snapshot) => {
			// console.log(snapshot.state);
			if(snapshot.state == 'success'){

				let today = new Date();
				let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				let dateTime = date+' '+time;
				// // wtitle, wurl, wfile, wembed, wicons, wcontent, wdate
				axios.post('http://localhost:3001/api/work', {
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
						clearTimeout(timeout);
						document.getElementById('editWorkBlock').style.height = this.refs.editwork.clientHeight + 'px';
						timeout = setTimeout(function() {
							document.getElementById('editWorkBlock').style.height = '0px';
						}, 50);
						this.setState({
							showEdit: this.state.showEdit == 'hide' ? '' : 'hide',
						});
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
		if(this.state.showEdit == "hide"){
			clearTimeout(timeout);
			document.getElementById('editWorkBlock').style.height = this.refs.editwork.clientHeight + 'px';
			timeout = setTimeout(function() {
				document.getElementById('editWorkBlock').style.height = 'auto';
			}, 610);
			// document.getElementById('editWorkBlock').style.height = "auto";
		}else{
			clearTimeout(timeout);
			document.getElementById('editWorkBlock').style.height = this.refs.editwork.clientHeight + 'px';
			timeout = setTimeout(function() {
				document.getElementById('editWorkBlock').style.height = '0px';
			}, 50);
			// document.getElementById('editWorkBlock').style.height = '0px';
		}



		this.setState({
			showEdit: this.state.showEdit == 'hide' ? '' : 'hide',
		});
	}

	showMenuCategory(){
		if(this.state.showEditCategory == "hide"){
			clearTimeout(timeout);
			document.getElementById('editWorkCategoryBlock').style.height = this.refs.editworkCategory.clientHeight + 'px';
			timeout = setTimeout(function() {
				document.getElementById('editWorkCategoryBlock').style.height = 'auto';
			}, 610);
		}else{
			clearTimeout(timeout);
			document.getElementById('editWorkCategoryBlock').style.height = this.refs.editworkCategory.clientHeight + 'px';
			timeout = setTimeout(function() {
				document.getElementById('editWorkCategoryBlock').style.height = '0px';
			}, 50);
		}



		this.setState({
			showEditCategory: this.state.showEditCategory == 'hide' ? '' : 'hide'
		});
	}

	updateWorks(){
		axios.get('http://localhost:3001/api/work')
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
					<p onClick={this.showMenuCategory}><i className="fa fa-plus-circle" aria-hidden="true"></i> New Category</p>
				</div>
				<div id="editWorkBlock" className={"action-blog " + this.state.showEdit}>
					<div className="withEdit" ref="editwork">
						<div className="workEditLeft">
							<input type="file"  ref="imageFile" onChange={(e)=>this._handleImageChange(e)} />
							<input ref="titledata" type="text" placeholder="Title" maxLength="100" required />
							<label>Category</label>
							<select>
								<option value="default">Select the category</option>
								{
									this.state.categoriesDatas.map((data, index) => {
										return (
											<option value="default">{data.cname}</option>
										)
									})
								}
							</select>
							<div>
								<button className="post" onClick={()=>{
									this.saveWork();
									}}>
									POST WORK
								</button>
							</div>
						</div>
						<div className="workEditLeft">
							{
								(this.state.imagePreviewUrl) ? (<div className="previwDemo"><img src={this.state.imagePreviewUrl} /></div>):(<div className="previewText"><p>Please select an Image for Preview</p></div>)
							}
						</div>
					</div>
				</div>
				<div id="editWorkCategoryBlock" className={"action-blog " + this.state.showEditCategory}>
					<div ref="editworkCategory">
						<input ref="categorydata" type="text" placeholder="Category name" maxLength="50"  />
						<div>
							<button className="post" onClick={()=>{
								this.saveCategory();
								}}>
								Save Category
							</button>
						</div>
					</div>
				</div>
				<div className="works-content">
					{
						this.state.workDatas.map((data, index) => {
							return (
								<div className="imageWorkBolc" key={index}>
									<img src={data.wurl} />
									<div className="work-option">
										<i onClick={()=>{ this.deleteWork(data._id,data.wfile);}} className="fa fa-trash" aria-hidden="true"></i>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className={"admin-modalbox " + this.state.categoryModal}>
				</div>
			</div>
	)}
}
