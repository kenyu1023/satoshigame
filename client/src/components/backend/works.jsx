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
			iconsDatas: [],
			sortWorkArray: [],
			iconsDatas: [],
			isUploading: false,
			progress: 0,
			avatarURL: '',
			file: '',
			fileIcon: '',
			imagePreviewUrl: '',
			showEditCategory: 'hide',
			categoryModal: 'hidemodal'
		}

		this.updateWorks = this.updateWorks.bind(this);
		this.showChangeMode = this.showChangeMode.bind(this);
		this.showMenu = this.showMenu.bind(this);
		this.showMenuCategory = this.showMenuCategory.bind(this);
		this.saveWork = this.saveWork.bind(this);
		this.updateWorks = this.updateWorks.bind(this);
		this._handleImageIconChange = this._handleImageIconChange.bind(this);
		this.saveIcon = this.saveIcon.bind(this);
		this.updateIcons = this.updateIcons.bind(this);

		this.editOptionChange = this.editOptionChange.bind(this);
		this.closeOptionModal = this.closeOptionModal.bind(this);

		this.updateWorks();
		this.updateCategory();
		this.updateIcons();
	}

	editOptionChange(){
		this.setState({
			categoryModal: ""
		});
	}

	closeOptionModal(){
		this.setState({
			categoryModal: "hidemodal"
		});
	}

	saveCategory(){
		if(this.refs.categorydata.value != ''){
			axios.post('http://localhost:3001/api/category', {
				cname: this.refs.categorydata.value
			})
			.then(response => {
				if(response.data.status == 'success'){
					console.log('success');
					this.refs.categorydata.value = '';
					this.updateCategory();
				}else{
					alert('Failed..');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}else{
			alert('Input category name please');
		}
	}

	deleteCategory(id){
		axios({
      method: 'delete',
      url: 'http://localhost:3001/api/category',
      data: {
        id,
      }
    })
    .then(response => {
			if(response.data.status == 'success'){
				console.log('success');
				this.updateCategory();
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
		if(this.refs.titledata.value != ""){
			if(this.refs.categoryId.value != "default"){
				firebase.storage().ref().child('satoshigame/work/'+this.state.file.name).put(this.state.file).then((snapshot) => {
					if(snapshot.state == 'success'){

						let today = new Date();
						let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
						let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						let dateTime = date+' '+time;
						// // wtitle, wurl, wfile, wembed, wicons, wcontent, wdate
						axios.post('http://localhost:3001/api/work', {
							wtitle: this.refs.titledata.value,
							wembed: this.refs.embeddata.value,
							wurl: snapshot.downloadURL,
							wfile: this.state.file.name,
							wcategory: this.refs.categoryId.value,
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
			}else{
				alert('Please select the category');
			}
		}else{
				alert('Please insert the name of work');
			}
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

	_handleImageIconChange(e) {
    e.preventDefault();
		this.state.fileIcon = e.target.files[0];
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
				workDatas: response.data,
				sortWorkArray: response.data,
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	showChangeMode(idcat){
		if(idcat==0){
			this.setState({
				sortWorkArray: this.state.workDatas
			});
		}else{
			let arrayMode = [];
			this.state.workDatas.map((data) =>
				{
					if (data.wcategory[0]._id == idcat){
						arrayMode.push(data);
					}
				}
			);
			this.setState({
				sortWorkArray: arrayMode
			});
		}
	}

	saveIcon(){
		firebase.storage().ref().child('satoshigame/icon/'+this.state.fileIcon.name).put(this.state.fileIcon).then((snapshot) => {
			if(snapshot.state == 'success'){
				// dname, dimage, durl
				axios.post('http://localhost:3001/api/icon', {
					dname: this.refs.iconnamedata.value,
					dimage: this.state.fileIcon.name,
					durl: snapshot.downloadURL
				})
				.then(response => {
					if(response.data.status == 'success'){
						console.log('success');
						this.refs.iconnamedata.value = '';
						this.updateIcons();
					}else{
						alert('Failed..');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}else{
				alert("Error Upload.. Please try again");
			}
		});
	}

	updateIcons(){
		axios.get('http://localhost:3001/api/icon')
		.then((response) => {
			this.setState({
				iconsDatas: response.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	deleteIcon(id, dname){
		axios({
      method: 'delete',
      url: 'http://localhost:3001/api/icon',
      data: {
        id,
      }
    })
    .then(response => {
			if(response.data.status == 'success'){
				var desertRef = firebase.storage().ref('satoshigame/icon').child(dname);
				desertRef.delete().then(() => {
					this.updateIcons();
				}).catch(function(error) {
					console.log(error);
				});
			}else{
				alert('Failed..');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	render(){
		return (
			<div className="works-template">
				<h1>WORKS</h1>
				<div className="action-bar">
					<p onClick={this.showMenu}><i className="fa fa-plus-circle" aria-hidden="true"></i> New Work</p>
					<p onClick={this.editOptionChange}>OPTIONS</p>
				</div>
				<div id="editWorkBlock" className={"action-work " + this.state.showEdit}>
					<div className="withEdit" ref="editwork">
						<div className="workEditLeft">
							<h3>Edit Work</h3>
							<input ref="titledata" type="text" placeholder="Title*" maxLength="100" required />
							<input type="file"  ref="imageFile" onChange={(e)=>this._handleImageChange(e)} />
							<label>Embed</label>
							<input ref="embeddata" type="text" placeholder="Embed Optional" maxLength="100" />
							<label>Category</label>
							<select ref="categoryId">
								<option value="default">Select the category</option>
								{
									this.state.categoriesDatas.map((data, index) => {
										return (
											<option value={data._id} key={index}>{data.cname}</option>
										)
									})
								}
							</select>
							<label>Software</label>
							<div className="developerIconWork">
								{
									this.state.iconsDatas.map((data, index) => {
										return (
											<div key={index} className="iconListSytleWork">
												<img src={data.durl} />
											</div>
										)
									})
								}
							</div>
							<div>
								<button className="post" onClick={()=>{
									this.saveWork();
									}}>
									POST WORK
								</button>
							</div>
						</div>
						<div className="workEditLeft">
							<h3>PREVIEW</h3>
							{
								(this.state.imagePreviewUrl) ? (<div className="previwDemo"><img src={this.state.imagePreviewUrl} /></div>):(<div className="previewText"><p>Please select an Image for Preview</p></div>)
							}
						</div>
					</div>
				</div>
				<div className="searchByCategory">
					<div onClick={()=>{ this.showChangeMode(0) }}>
						All
					</div>
					{
						this.state.categoriesDatas.map((data, index) => {
							return (
								<div onClick={()=>{ this.showChangeMode(data._id) }} key={index}>
									{data.cname}
								</div>
							)
						})
					}
				</div>
				<div className="works-content">
					{
						this.state.sortWorkArray.map((data, index) => {
							return (
								<div className="imageWorkBolc" key={index}>
									<div className="overflowh">
										<img src={data.wurl} />
										<div className="work-option">
											<i onClick={()=>{ this.deleteWork(data._id,data.wfile);}} className="fa fa-trash" aria-hidden="true"></i>
											<i className="fa fa-pencil-square" aria-hidden="true"></i>
											{
												data.wembed != '' ?  <i className="fa fa-cube" aria-hidden="true"></i> : ''
											}
										</div>
										<div className="categoryShowImage">
											 <div>{ data.wcategory[0].cname }</div>
										</div>
										<div className="icon-section-work">
											{
												data.wicons.map((dataicon, index) => {
													return (
														<img key={index} src={dataicon.durl} />
													)
												})
											}
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className={"admin-modalboxblog " + this.state.categoryModal}>
					<div id="editWorkCategoryBlock" className={"action-work-option"}>
						<i onClick={this.closeOptionModal} className="fa fa-3x fa-times-circle" aria-hidden="true"></i>
						<div ref="editworkCategory" className="withEdit">
							<h1>CATEGORY</h1>
							<div className="workEditLeft">
								<h3>CATEGORY</h3>
								<input ref="categorydata" type="text" placeholder="Category name" maxLength="50"  />
								<div>
									<button className="post" onClick={()=>{
										this.saveCategory();
										}}>
										SAVE CATEGORY
									</button>
								</div>
							</div>
							<div className="workEditLeft editcategory-list">
								<h3>CATEGORY LIST</h3>
									{
										this.state.categoriesDatas.map((data, index) => {
											return (
												<div value="default" key={index}>
													<i className="fa fa-times-circle-o" onClick={()=>{this.deleteCategory(data._id)}} aria-hidden="true"></i>
													{" "+data.cname}
												</div>
											)
										})
									}
							</div>
						</div>
					</div>
					<div id="editWorkCategoryBlock" className={"action-work-option"}>
						<div ref="editworkCategory" className="withEdit">
							<h1>DEVELOP ICONS</h1>
							<div className="workEditLeft">
								<h3>ICONS</h3>
								<input ref="iconnamedata" type="text" placeholder="Category name" maxLength="50"  />
								<input type="file"  ref="imageIconFile" onChange={(e)=>this._handleImageIconChange(e)} />
								<div>
									<button className="post" onClick={()=>{
										this.saveIcon();
										}}>
										SAVE ICON
									</button>
								</div>
							</div>
							<div className="workEditLeft editIcon-list">
								<h3>ICON LIST</h3>
								<div className="editIcon-list-flex">
									{
										this.state.iconsDatas.map((data, index) => {
											return (
												<div key={index} className="iconListSytle">
													<i className="fa fa-times-circle-o" onClick={()=>{this.deleteIcon(data._id,data.dimage)}} aria-hidden="true"></i>
													<img src={data.durl} />
													<p>{data.dname}</p>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	)}
}
