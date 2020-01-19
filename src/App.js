import React from 'react';
import Cards from './Components/Cards/Cards';
import TwoSum from './Components/TwoSum';
import Paper from '@material-ui/core/Paper';

function App() {
	return (
		<React.Fragment>
			
			<Paper>
				<Cards />
			</Paper>
			<Paper>
				<TwoSum nums={[2, 7, 11, 15]} target={9} />
			</Paper>
		</React.Fragment>
	);
}

export default App;
