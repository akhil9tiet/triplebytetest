import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Success = () => {
	return (
		<div style={{ backgroundColor: '#23b234', padding: '20vh' }}>
			<Typography>All steps completed</Typography>
			<Link to={'https://www.google.com'}>OK</Link>
		</div>
	);
};

export default Success;
