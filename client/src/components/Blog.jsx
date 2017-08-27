import React from 'react'
import '../../styles/index.scss'

export default class App extends React.Component {

		constructor(props){
			super(props);
			this.state = {

			};
		}
		render(){
			return (
				<div>
					<h1 className="blog-title">Blog</h1>
					<div className="blog-main">
						<div className="large-6 columns blog-panel">
							<div className="blog-img-div">
							  <img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="blog-img" />
							</div>

							<div className="blog-para">
								<h5>Aug 26 2017</h5>
								<h3>Lorem ipusm</h3>
								<p>lorem ipsum test para this is short description</p>
							</div>
						</div>

						<div className="large-6 columns blog-panel">
							<div className="blog-img-div">
							  <img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="blog-img" />
							</div>

							<div className="blog-para">
								<h5>Aug 26 2017</h5>
								<h3>Lorem ipusm</h3>
								<p>lorem ipsum test para this is short description</p>
							</div>
						</div>
					</div>
				</div>
			)
		}
}
