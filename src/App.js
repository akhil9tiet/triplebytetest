import React from 'react';
import Cards from './Components/Cards/Cards';
// import TwoSum from './Components/TwoSum';
import Paper from '@material-ui/core/Paper';

function App() {
	return (
		<React.Fragment>
			<Paper>
				<Cards />
			</Paper>
			{/* <Paper>
				<TwoSum />
			</Paper> */}
		</React.Fragment>
	);
}

export default App;
