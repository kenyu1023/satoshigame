import React from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import '../../styles/index.scss'

export default class App extends React.Component {
		// http://localhost:3001
		constructor(props){
			super(props);
			this.state = {
				blogDatas: [],
				loaded: false
			};

			this.updateWorks = this.updateWorks.bind(this);

		}

		componentWillMount(){
			this.updateWorks();
		}

		updateWorks(){
			axios.get('/api/blog')
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
											<a>READ</a>
										</div>
									</div> :

									<div className="large-12 columns blog-panel" key={index}>
										<div className="blog-para-full">
											<h1>{data.btitle}</h1>
											<p>{data.bdate}</p>
											<a>READ</a>
										</div>
									</div>


								)
							})
						}
						{/* <div className="large-6 columns blog-panel">
							<div className="blog-img-div">
							  <img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="blog-img" />
							</div>

							<div className="blog-para">
								<h5>Aug 26 2017</h5>
								<h3>Lorem ipusm</h3>
								<p>lorem ipsum test para this is short description</p>
							</div>
						</div> */}

						{/* <div className="large-6 columns blog-panel">
							<div className="blog-img-div">
							  <img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="blog-img" />
							</div>

							<div className="blog-para">
								<h5>Aug 26 2017</h5>
								<h3>Lorem ipusm</h3>
								<p>lorem ipsum test para this is short description</p>
							</div>
						</div> */}
					</div>
				</div>
			)
		}
}
