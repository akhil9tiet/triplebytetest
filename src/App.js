import React from 'react';
import Home from './Components/Home';
import Cards from './Components/Cards/Cards';
import DadJokes from './Components/API_call/DadJokes';
import Github_top_stars from './Components/API_call/Github_top_stars';
import LiveSearch from './Components/LiveSearch';
import SideDrawer from './Components/SideDrawer';
import SendPropsUp from './Components/SendPropsUp';
import ContactUs from './Components/ContactUs';
import Report from './Components/ServerLogs/Report';
import TrafficLight from './Components/TrafficLight';
import SVGPathScroller from './Components/SVGPathScroller';
import ScrollProgress from './Components/SVGPathScroller/ScrollProgress';
import DeltaIsometric from './Components/DeltaIsometric';
import IMDBapi from './Components/IMDBapi';
import StepperComponent from './Components/Stepper';
import SearchTodo from './Components/SearchTodo/SearchTodo';
import { Debouncer, Throttler } from './Components/CoreImplementations';
import InputValidator from './Components/InputValidator/InputValidator';
import SignupForm from './Components/Forms/SignupForm';
import FootballAPI from './Components/Hackerank/FootballAPI';

import { Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
	const logs = [
		'[01/Aug/1995:00:54:59 -0400] "GET /images/opf-logo.gif HTTP/1.0" 200 32511',
		'[01/Aug/1995:00:55:04 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 200 363',
		'[01/Aug/1995:00:55:06 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 403 298',
		'[01/Aug/1995:00:55:09 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 200 3635',
		'[01/Aug/1995:00:55:18 -0400] "GET /images/opf-logo.gif HTTP/1.0" 200 32511',
		'[01/Aug/1995:00:56:52 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 200 36',
	];

	return (
		<React.Fragment>
			<SideDrawer />
			<Switch>
				{/* <div className="body"> */}
				<Route exact path='/' component={Home} />
				<Route path='/home' component={Home} />
				<Route exact path='/dad-jokes' component={DadJokes} />
				<Route exact path='/github-top-js' component={Github_top_stars} />
				<Route exact path='/live-search' component={LiveSearch} />
				<Route exact path='/list-cards' component={Cards}></Route>
				<Route exact path='/server-logs' render={(props) => <Report logs={logs} {...props} />}></Route>
				<Route exact path='/send-props-up' component={SendPropsUp}></Route>
				<Route exact path='/contact-us' component={ContactUs}></Route>
				<Route exact path='/traffic-light' component={TrafficLight}></Route>
				<Route exact path='/svg-path-scroller' component={SVGPathScroller}></Route>
				<Route exact path='/scroll-progress' component={ScrollProgress}></Route>
				<Route exact path='/delta-isometric' component={DeltaIsometric}></Route>
				<Route exact path='/imdb-api' component={IMDBapi}></Route>
				<Route exact path='/stepper' component={StepperComponent}></Route>
				<Route exact path='/search-todo' component={SearchTodo}></Route>
				<Route exact path='/debouncer' component={Debouncer}></Route>
				<Route exact path='/throttler' component={Throttler}></Route>
				<Route exact path='/input-validator' component={InputValidator}></Route>
				<Route exact path='/signup-form' component={SignupForm}></Route>
				<Route exact path='/football-api' component={FootballAPI}></Route>
				{/* </div> */}
				{/* </div> */}
			</Switch>
		</React.Fragment>
	);
}

export default App;
