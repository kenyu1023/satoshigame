import React from 'react'
import '../../styles/index.scss'

export default class App extends React.Component {

		constructor(props){
			super(props);
			this.state = {

			};



			// function ModalImgChange(){
			// 	var modalImg = document.getElementById("ModalMainImg");

			// }
		}
		render(){
			return (
				<div>
					<div className="portfolio-header">
						<h1>Portfolio</h1>
						<span className="border-left">All</span><span className="border">Personal Work</span><span className="border-right">Company Work</span>
					</div>

					<div className="portfolio-main">
						<div className="works-panel">
							<a href="#test"><img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" /></a>
						</div>

						<div className="modal" id="test">
							<div className="modal-container">
								<div className="modal-img">
									<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" id="ModalMainImg"alt="#" />
								</div>
								<div className="modal-sub-img-container">
								<div className="modal-sub-img">
									<img src="https://www.downgraf.com/wp-content/uploads/2015/09/Video-Game-Character-Design-Collection-002.jpg" alt="#" id="ModalSubImg1" onClick="ModalImgChange()"/>
								</div>

									<div className="modal-sub-img">
									<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
								</div>

									<div className="modal-sub-img">
									<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
								</div>

									<div className="modal-sub-img">
									<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
								</div>

									<div className="modal-sub-img">
									<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
								</div>
								</div>
								<div className="modal-para">
									<h1>Title lorem ipsum</h1>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									<a href="#modal-close">close</a>
								</div>
							</div>
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>
						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>
						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>

						<div className="works-panel">
							<img src="https://i.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="#" />
						</div>
					</div>
					</div>
			)
		}
}
