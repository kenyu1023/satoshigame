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
						<div className="page-top">
							<img className="logo" src="https://upload.wikimedia.org/wikipedia/en/2/20/Los_Angeles_Dodgers_Logo.png" />
							<h1>Hi AHO</h1>
						</div>

						<div className="intro">
							<div className="intro-para">
								<h2>Hi This is an intro</h2>
								<p>intro text here I am Satoshi Takasawa fake paragaraph here this is going to be about three breakpoint para</p>
							</div>
						</div>

						<div className="about">
							<div className="about-para">
								<h3>I am a Designer</h3>
								<p>I am a Japanese artist who specialise in game character design, game environmetn design and CG.
									 I have five years of professional experience in e CG design industry.
								</p>

								<img className="portlate" src="" alt="My photo"/>
							</div>
						</div>

				</div>
			)
		}
}
