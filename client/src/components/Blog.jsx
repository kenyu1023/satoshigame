import React from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import '../../styles/index.scss'

export default class App extends React.Component {

		constructor(props){
			super(props);
			this.state = {
				blogDatas: [],
				loaded: false
			};

			this.updateWorks = this.updateWorks.bind(this);
			this.updateWorks();
		}

		updateWorks(){
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

		shouldComponentUpdate(nextProps, nextState){
			if(this.state.loaded != nextState.loaded ){
				return true;
			}else{
				return false;
			}

		}

		render(){
			return (
				<div>
					<h1 className="blog-title">Blog</h1>
					<div className="blog-main">
						{
							this.state.blogDatas.map((data, index) => {
								return (
									<div className="large-6 columns blog-panel" key={index}>
										<h3>{data.btitle}</h3>
										<p>{data.bdate}</p>
										<div>{renderHTML(data.bcontent)}</div>
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
