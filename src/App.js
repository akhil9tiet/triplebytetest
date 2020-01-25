import React from 'react';
import Cards from './Components/Cards/Cards';
import DadJokes from './Components/API_call/DadJokes';
import TwoSum from './Components/TwoSum';
import TwoMovies from './Components/TwoMovieProblem';
import Solution from './Components/chat-app-problem';

import { Switch, Route } from 'react-router-dom';
import Report from './Components/ServerLogs/Report';
import Paper from '@material-ui/core/Paper';

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
			<Paper>
				<Cards />
			</Paper>
			<Paper>
				<TwoSum nums={[2, 7, 11, 15]} target={9} />
			</Paper>
			<Paper>
				<DadJokes />
			</Paper>
			<Paper>
				<Report logs={logs} />
			</Paper>

			<Paper>
				<TwoMovies movies={[90, 86, 75, 60, 120, 150, 125]} duration={250} />
			</Paper>

			<Solution messages={'Rainbod'} />
		</React.Fragment>
	);
}

export default App;
