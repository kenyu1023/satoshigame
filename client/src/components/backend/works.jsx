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
			WorkShowIcons: [],
			selectedIcons: [],
			progress: 0,
			avatarURL: '',
			file: '',
			fileIcon: '',
			cateditid: 0,
			worksEditId: 0,
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
		this.categoryselected = this.categoryselected.bind(this);
		this.iconsselected = this.iconsselected.bind(this);
		this.worksEditMode = this.worksEditMode.bind(this);
		this.cancelWork = this.cancelWork.bind(this);

		this.editOptionChange = this.editOptionChange.bind(this);
		this.closeOptionModal = this.closeOptionModal.bind(this);

		this.updateWorks();
		this.updateCategory();
		this.updateIcons();
	}

	cancelWork(){

		clearTimeout(timeout);
		document.getElementById('editWorkBlock').style.height = this.refs.editwork.clientHeight + 'px';
		timeout = setTimeout(function() {
			document.getElementById('editWorkBlock').style.height = '0px';
		}, 50);

		this.refs.categoryId.value = "default";
		this.state.WorkShowIcons.map((data2, index2)=>{
			this.state.WorkShowIcons[index2].cselected = "";
		});

		this.setState({
			showEdit: 'hide',
			WorkShowIcons: this.state.WorkShowIcons,
			selectedIcons: [],
			imagePreviewUrl: '',
			file: '',
			worksEditId: 0
		});

		this.refs.titledata.value = "";
		this.refs.embeddata.value = "";
		this.refs.imageFile.value = null;
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
			if(this.state.cateditid == 0){
				axios.post('/api/category', {
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
				axios.put('/api/category', {
					id: this.state.cateditid,
					cname: this.refs.categorydata.value
				})
				.then(response => {
					if(response.data.status == 'success'){
						this.state.cateditid = 0;
						this.refs.categorydata.value = '';
						this.updateCategory();
					}else{
						alert('Failed..');
					}
				})
				.catch(err => {
					console.error(new Error(err))
				})
			}
		}else{
			alert('Input category name please');
		}
	}

	deleteCategory(id){
		axios({
      method: 'delete',
      url: '/api/category',
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
		axios.get('/api/category')
		.then((response) => {
			// console.log(response.data);
			let dataCat = [];
			response.data.map((data, index)=>{
				data.cselected = "";
				dataCat.push(data);
			});
			this.setState({
				categoriesDatas: dataCat
			});

		})
		.catch(function (error) {
			console.log(error);
		});
	}

	deleteWork(id,nameImage){
		axios({
      method: 'delete',
      url: '/api/work',
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
				if(this.state.worksEditId == 0){
					firebase.storage().ref().child('satoshigame/work/'+this.state.file.name).put(this.state.file).then((snapshot) => {
						if(snapshot.state == 'success'){

							let today = new Date();
							let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
							let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
							let dateTime = date+' '+time;
							// // wtitle, wurl, wfile, wembed, wicons, wcontent, wdate
							axios.post('/api/work', {
								wtitle: this.refs.titledata.value,
								wembed: this.refs.embeddata.value,
								wurl: snapshot.downloadURL,
								wfile: this.state.file.name,
								wcategory: this.refs.categoryId.value,
								wicons: this.state.selectedIcons,
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

									this.state.WorkShowIcons.map((data)=>{
										data.cselected = "";
									});

									this.setState({
										showEdit: this.state.showEdit == 'hide' ? '' : 'hide',
										WorkShowIcons: this.state.WorkShowIcons,
										selectedIcons: [],
										imagePreviewUrl: '',
										file: ''
									});

									this.refs.titledata.value = "";
									this.refs.embeddata.value = "";
									this.refs.imageFile.value = null;

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
					axios.put('/api/work', {
						id: this.state.worksEditId,
						wtitle: this.refs.titledata.value,
						wembed: this.refs.embeddata.value,
						wurl: this.state.imagePreviewUrl,
						wfile: this.state.file.name,
						wcategory: this.refs.categoryId.value,
						wicons: this.state.selectedIcons,
						wcontent: ''
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

							this.state.WorkShowIcons.map((data)=>{
								data.cselected = "";
							});

							this.setState({
								showEdit: this.state.showEdit == 'hide' ? '' : 'hide',
								WorkShowIcons: this.state.WorkShowIcons,
								selectedIcons: [],
								imagePreviewUrl: '',
								file: '',
								worksEditId: 0
							});

							this.refs.titledata.value = "";
							this.refs.embeddata.value = "";
							this.refs.imageFile.value = null;

						}else{
							alert('Failed..');
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				}
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

			this.refs.categoryId.value = "default";
			this.state.WorkShowIcons.map((data2, index2)=>{
				this.state.WorkShowIcons[index2].cselected = "";
			});

			this.setState({
				showEdit: 'hide',
				WorkShowIcons: this.state.WorkShowIcons,
				selectedIcons: [],
				imagePreviewUrl: '',
				file: '',
				worksEditId: 0
			});

			this.refs.titledata.value = "";
			this.refs.embeddata.value = "";
			this.refs.imageFile.value = null;
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
		axios.get('/api/work')
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
				axios.post('/api/icon', {
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
		axios.get('/api/icon')
		.then((response) => {

			let dataWorkIcons = [];
			response.data.map((data, index)=>{
				data.cselected = "";
				dataWorkIcons.push(data);
			});

			this.setState({
				iconsDatas: response.data,
				WorkShowIcons: dataWorkIcons
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	deleteIcon(id, dname){
		axios({
      method: 'delete',
      url: '/api/icon',
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

	categoryselected(index,id){

		this.state.categoriesDatas.map((data, indexdata)=>{
			if(index!=indexdata){
				this.state.categoriesDatas[indexdata].cselected="";
			}
		});

		if(this.state.categoriesDatas[index].cselected == ""){
			this.state.categoriesDatas[index].cselected = "selectededit";
			this.state.cateditid = id;
			this.refs.categorydata.value = this.state.categoriesDatas[index].cname;
		}else{
			this.state.categoriesDatas[index].cselected = "";
			this.state.cateditid = 0;
			this.refs.categorydata.value = "";
		}

		this.setState({
			categoriesDatas: this.state.categoriesDatas
		});
	}

	iconsselected(index,id){

		if(this.state.WorkShowIcons[index].cselected == ""){
			this.state.WorkShowIcons[index].cselected = "selectedIconsSave";
			this.state.selectedIcons.push(id);
		}else{
			this.state.WorkShowIcons[index].cselected = "";
			let indexIcondata = this.state.selectedIcons.indexOf(id);

			if (index > -1) {
				this.state.selectedIcons.splice(indexIcondata, 1);
			}
		}

		this.setState({
			WorkShowIcons: this.state.WorkShowIcons
		});
	}

	worksEditMode(id, index){
		console.log(this.state.sortWorkArray);
		this.refs.titledata.value = this.state.sortWorkArray[index].wtitle;
		this.refs.embeddata.value = this.state.sortWorkArray[index].wembed;
		this.refs.categoryId.value = this.state.sortWorkArray[index].wcategory[0]._id;

		this.state.WorkShowIcons.map((data2, index2)=>{
			this.state.WorkShowIcons[index2].cselected = "";
		});
		this.state.selectedIcons = [];

		this.state.sortWorkArray[index].wicons.map((data)=>{
			this.state.WorkShowIcons.map((data2, index2)=>{
				if(data._id == data2._id){
					this.state.WorkShowIcons[index2].cselected = "selectedIconsSave";
					this.state.selectedIcons.push(data2._id);
				}
			});
		});

		clearTimeout(timeout);
		document.getElementById('editWorkBlock').style.height = this.refs.editwork.clientHeight + 'px';
		timeout = setTimeout(function() {
			document.getElementById('editWorkBlock').style.height = 'auto';
		}, 610);

		this.setState({
			showEdit: this.state.showEdit = '',
			imagePreviewUrl: this.state.sortWorkArray[index].wurl,
			WorkShowIcons: this.state.WorkShowIcons,
			worksEditId: id
		});
		document.getElementById('WorkSectionAdmin').scrollTop = 0;
	}

	render(){
		return (
			<div name="worktemplate" className="works-template">
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
									this.state.WorkShowIcons.map((data, index) => {
										return (
											<div onClick={()=> {this.iconsselected(index, data._id)} } key={index} className={"iconListSytleWork"}>
												<div className={data.cselected}>
													<img src={data.durl} />
												</div>
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
								<button className="post" onClick={()=>{
									this.cancelWork();
									}}>
									CANCEL
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
											<i onClick={()=>{ this.deleteWork(data._id,data.wfile)}} className="fa fa-trash" aria-hidden="true"></i>
											<i onClick={()=>{ this.worksEditMode(data._id, index)}} className="fa fa-pencil-square" aria-hidden="true"></i>
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
												<div className="flexrow" value="default" key={index}>
													<i className="fa fa-times-circle-o" onClick={()=>{this.deleteCategory(data._id)}} aria-hidden="true"></i>
													<div className={data.cselected} onClick={()=>{this.categoryselected(index,data._id)}}>{data.cname}</div>
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
