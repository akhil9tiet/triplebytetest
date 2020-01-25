import React from 'react';
import Home from './Components/Home';
import Cards from './Components/Cards/Cards';
import DadJokes from './Components/API_call/DadJokes';
import SideDrawer from './Components/SideDrawer';
import Report from './Components/ServerLogs/Report';
import { Switch, Route } from 'react-router-dom';

function App() {
	const logs = [
		'[01/Aug/1995:00:54:59 -0400] "GET /images/opf-logo.gif HTTP/1.0" 200 32511',
		'[01/Aug/1995:00:55:04 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 200 363',
		'[01/Aug/1995:00:55:06 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 403 298',
		'[01/Aug/1995:00:55:09 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 200 3635',
		'[01/Aug/1995:00:55:18 -0400] "GET /images/opf-logo.gif HTTP/1.0" 200 32511',
		'[01/Aug/1995:00:56:52 -0400] "GET /images/ksclogosmall.gif HTTP/1.0" 200 36'
	];

	return (
		<React.Fragment>
			<SideDrawer />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/home' component={Home} />
				<Route exact path='/dad-jokes' component={DadJokes} />
				<Route exact path='/list-cards' component={Cards}></Route>
				<Route
					exact
					path='/server-logs'
					render={(props) => {
						return <Report logs={logs} {...props} />;
					}}></Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;
