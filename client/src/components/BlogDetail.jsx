import React from 'react'
import renderHTML from 'react-render-html'
import '../../styles/index.scss'

export default class App extends React.Component {
		// http://localhost:3001
		constructor(props){
			super(props);
		}

		componentWillMount(){

		}

		render(){

			return (
				<div>
					<h1>{this.props.blogdetail.btitle}</h1>
					<div>{ this.props.blogdetail.bcontent !=undefined ? renderHTML(this.props.blogdetail.bcontent) : '' }</div>
				</div>
			)
		}
}
