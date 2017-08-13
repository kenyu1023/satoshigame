import React from 'react'
import { Link } from 'react-router-dom'
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
								<p>intro text here I am Satoshi Takasawa fake paragaraph here this is going to be about three breakpoint para.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							</div>
						</div>

						<div className="about">
							<div className="about-para">
								<h2>I am a Designer</h2>
								<p>I am a Japanese artist who specialise in game character design, game environmetn design and CG.
									 I have five years of professional experience in e CG design industry.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
									<Link to='/about'>Read More</Link>
								</div>
								<div className="about-img">
									<img className="portlate" src="https://static.pexels.com/photos/157669/portrait-character-black-and-white-lofty-tone-157669.jpeg" alt="My photo"/>
								</div>
						</div>

						<div className="portfolio">
							<h2 className="portfolio-title">Portfolio</h2>

							<div className="portfolio-slider">
								<div className="img-div">
									<img src="https://s-media-cache-ak0.pinimg.com/originals/2f/ef/43/2fef438ac76fdc908b9ff698d78c8c03.png" alt="portfolio" />
								</div>

								<div className="img-div">
									<img src="https://i.pinimg.com/736x/66/bf/97/66bf97d6305dc576a77a1ed26606315e--game-character-design-simple-character.jpg" alt="portfolio" />
								</div>

								<div className="img-div">
									<img src="https://s-media-cache-ak0.pinimg.com/736x/cf/ee/38/cfee38497172d6e70425235c35ae102a--game-character-design-character-design-animation.jpg" alt="portfolio" />
								</div>

								<div className="img-div">
									<img src="https://s-media-cache-ak0.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="portfolio" />
								</div>

								<div className="img-div">
									<img src="https://s-media-cache-ak0.pinimg.com/originals/2f/ef/43/2fef438ac76fdc908b9ff698d78c8c03.png" alt="portfolio" />
								</div>

								<div className="img-div">
									<img src="https://s-media-cache-ak0.pinimg.com/736x/d7/61/38/d76138de84a31689daaa36be8df56fbd--game-character-design-main-character.jpg" alt="portfolio" />
								</div>

						</div>
							<a className="portfolioButton">See More</a>
						</div>

						<div className="blog">
							<div className="blog-box">
								<div className="blog-box-para">
									<h2>My Blog</h2>
									<h3>This is what I thought</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
									<a className="blogBottun">Go Blog</a>
								</div>
							</div>
						</div>

						<div className="contact">
							<div className="myInfo">
								<h2>This is my Info</h2>
								<h1>Satoshi Takasawa</h1>
								<p>mail.address@mail.com</p>
								<div className="social">
									<div className="socialImg">
										<img src="http://www.iconsdb.com/icons/preview/gray/facebook-2-xxl.png" alt="" />
									</div>

									<div className="socialImg">
										<img src="http://www.iconsdb.com/icons/preview/gray/facebook-2-xxl.png" alt="" />
									</div>

									<div className="socialImg">
										<img src="http://www.iconsdb.com/icons/preview/gray/facebook-2-xxl.png" alt="" />
									</div>

									<div className="socialImg">
										<img src="http://www.iconsdb.com/icons/preview/gray/facebook-2-xxl.png" alt="" />
									</div>
								</div>
							</div>

							<div className="contactForm">
								<div className="contactMe">
									<h2>Contact Me</h2>
									<form>
										<div className="input">
											<label>*Name</label>
											<input type="text"
														name="name"
														id="name" />
										</div>

									<div className="input">
										<label>*Email</label>
										<input type="text"
													 name="email"
													 id="email" />
									</div>

									<div className="input">
										<label>*Phone</label>
										<input type="tel"
													 name="phone"
													 id="phone" />
									</div>

									<div className="input">
										<label>*Your Message</label>
										<textarea id="message"></textarea>
									</div>

										<input type="submit"
													 id="submit"
													 value="Submit" />
									</form>
								</div>
							</div>
							</div>
						</div>
			)
		}
}
