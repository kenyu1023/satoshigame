import React, { Component } from 'react'
import Foundation from 'react-foundation'

export default class blog extends Component{

	render(){
		return (
			<div className="blog-template">
				<h1>BLOG</h1>
				<div className="action-bar">
					<p>+ New Blog</p>
				</div>
				<div className="blog-content">
					<div className="blog-ad-style">
						<h3>Blog 1</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						<p>- Delete Blog</p>
					</div>
				</div>
			</div>
	)}
}
