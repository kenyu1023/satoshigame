import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../styles/index.scss'

class App extends React.Component {

		constructor(props){
			super(props);
			this.state = {

			};
		}
		render(){
			return (
				<div>
					<div className="page-top">
						<h1>Hi Yuki</h1>
					</div>
				</div>
			)
		}
}
