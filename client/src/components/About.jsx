import React from 'react'
import '../../styles/index.scss'

export default class App extends React.Component {

		constructor(props){
			super(props);
			this.state = {
			};
		}

		componentDidMount(){
			this.props.loading();
		}

		render(){
			return (
				<div>
						<div className="about-main">
							<div className="about-para">
								<h1>Satoshi Takazawa</h1>

								<div className="positionName">
									<h2>CG Design Artist</h2>
									<h2>Game Character desiner</h2>
									<h2>Game Environment Artist</h2>
								</div>

								<div className="experience">
									<h3>Experience</h3>
									<div className="each-experience">
										<h3>experience 1</h3>
										<p>2016 - Current</p>
										<p>company name A this is fake para and lorem ipsum</p>
									</div>

									<div className="each-experience">
										<h3>experience 2</h3>
										<p>2013 - 2015</p>
										<p>company name A this is fake para and lorem ipsum</p>
									</div>

									<div className="each-experience">
										<h3>experience 3</h3>
										<p>2010 - 2012</p>
										<p>company name A this is fake para and lorem ipsum</p>
									</div>
								</div>

								<div className="skills">
									<h3>Skills</h3>
									<div className="skills-each">
										<h5>Skill A</h5>
										<h5>Skill B</h5>
										<h5>Skill C</h5>
										<h5>Skill D</h5>
										<h5>Skill F</h5>
									</div>
								</div>
							</div>
						</div>
				</div>
			)
		}
}
