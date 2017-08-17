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
					<div className="portfolio-header">
						<h1>Portfolio</h1>
						<span className="border-left">All</span><span className="border">Personal Work</span><span className="border-right">Company Work</span>
					</div>

					<div className="portfolio-main">
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
