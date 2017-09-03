import React from 'react'
import { Link } from 'react-router-dom'
import { ParallaxController } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';
import Slider from 'react-slick';
import axios from 'axios';
import '../../styles/index.scss'

ParallaxController.init();

export default class App extends React.Component {
		// http://localhost:3001
		constructor(props){
			super(props);
			this.state = {
				workDatas: []
			};

			this.updateWorks = this.updateWorks.bind(this);
			this.updateWorks();
		}

		componentDidMount(){
			// this.props.loading();
		}

		updateWorks(){
			axios.get('http://localhost:3001/api/work')
			.then((response) => {
				this.setState({
					workDatas: response.data
				});
				this.props.loading();
			})
			.catch(function (error) {
				console.log(error);
			});
		}

		render(){

			var settings = {
				dots: false,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 1500,
				speed: 700,
				swipeToSlide: true,
				slidesToShow: 3,
				slidesToScroll: 1
			};

			return (
				<div className="home-style">
						<div className="page-top">
							<video autoPlay loop id="video-background" muted>
  						<source src="https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761" type="video/mp4" />
							</video>
							{/* <img className="logo" src="https://upload.wikimedia.org/wikipedia/en/2/20/Los_Angeles_Dodgers_Logo.png" /> */}
							<h1 className="name">SATOSHI TAKAZAWA</h1>
						</div>

						<div className="intro">
							<div className="intro-para">
								<h2>Hi This is an intro</h2>
								<p>intro text here I am Satoshi Takasawa fake paragaraph here this is going to be about three breakpoint para.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							</div>
							<Parallax
								className="intro-parallax"
								offsetYMax={20}
								offsetYMin={-20}
								slowerScrollRate
								tag="figure"
								>
								<h1>CG Artist</h1>
								</Parallax>

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
								<Parallax
								className="about-parallax"
								offsetYMax={20}
								offsetYMin={-20}
								slowerScrollRate
								tag="figure"
								>
								<h1>Who I am</h1>
							</Parallax>
						</div>

						<div className="portfolio">
							<Parallax
								className="portfolio-parallax"
								offsetYMax={20}
								offsetYMin={-20}
								slowerScrollRate
								tag="figure"
								>
							<h1>Portfolio</h1>
							</Parallax>

							<div className="portfolio-slider">

								<Slider {...settings}>

									<div className="img-div"><img src="https://s-media-cache-ak0.pinimg.com/originals/2f/ef/43/2fef438ac76fdc908b9ff698d78c8c03.png" alt="portfolio" /></div>
									{
										this.state.workDatas.map((data, index) => {
											return (
												<div className="img-div" key={data._id} >
													<img src={data.wurl} />
												</div>
											)
										})
									}
								</Slider>

							</div>
							<Link to='/portfolio'>See More</Link>
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
							<Parallax
								className="blog-parallax"
								offsetYMax={20}
								offsetYMin={-20}
								slowerScrollRate
								tag="figure"
								>
								<h1>My Style</h1>
							</Parallax>
						</div>

						<div className="contact">
							<div className="myInfo">
								<h1>Satoshi Takazawa</h1>
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
							<Parallax
								className="contact-parallax"
								offsetYMax={20}
								offsetYMin={-20}
								slowerScrollRate
								tag="figure"
								>
								<h1>Say Hello!</h1>
							</Parallax>
							</div>
						</div>
			)
		}
}
