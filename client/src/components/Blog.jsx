import React from 'react'
import axios from 'axios'
import BlogDetail from './BlogDetail'
import '../../styles/index.scss'

export default class App extends React.Component {
		// http://localhost:3001
		constructor(props){
			super(props);
			this.state = {
				blogDatas: [],
				loaded: false,
				blogSelected: {}
			};

			this.updateBlog = this.updateBlog.bind(this);
			this.blogSelectedDetail = this.blogSelectedDetail.bind(this);
		}

		componentWillMount(){
			this.updateBlog();
		}

		updateBlog(){
			axios.get('http://localhost:3001/api/blog')
			.then((response) => {
				console.log(response.data);
					this.setState({
						blogDatas: response.data,
						loaded: true
					}, ()=>{
						this.props.loading();
					});

				})
				.catch(function (error) {
					console.log(error);
				});
		}

		blogSelectedDetail(data){
			this.setState({
				blogSelected: data
			});
		}

		render(){
			return (
				<div className="row-blog">
					<h1 className="blog-title">Blog</h1>
					<div className="blog-main">
						{
							this.state.blogDatas.map((data, index) => {
								return (

									data.bmainimage != "" ?
									<div className="large-12 columns blog-panel" key={index}>
										<div className="blog-img-div"><img src={data.bmainimage} /></div>
										<div className="blog-para">
											<h1>{data.btitle}</h1>
											<p>{data.bdate}</p>
											<a onClick={()=>{this.blogSelectedDetail(data)}}>READ</a>
										</div>
									</div> :

									<div className="large-12 columns blog-panel" key={index}>
										<div className="blog-para-full">
											<h1>{data.btitle}</h1>
											<p>{data.bdate}</p>
											<a onClick={()=>{this.blogSelectedDetail(data)}}>READ</a>
										</div>
									</div>


								)
							})
						}
						<BlogDetail blogdetail={this.state.blogSelected} />
					</div>
				</div>
			)
		}
}
