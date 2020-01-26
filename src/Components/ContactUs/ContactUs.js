import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import './ContactUs.css';

const ContactUs = () => {
	const [details, setDetails] = useState({
		name: '',
		email: '',
		message: ''
	});

	// useEffect(() => {
	// 	console.log(details);
	// }, [details]);

	return (
		<React.Fragment>
			<form>
				<div className='form-group'>
					<label>
						Name:
						<input type='text' onChange={(e) => setDetails({ name: e.target.value })} />
					</label>
					<label htmlFor='exampleInputEmail1'>
						Email:{' '}
						<input
							type='email'
							aria-describedby='emailHelp'
							onChange={(e) => setDetails({ email: e.target.value })}
						/>
					</label>
					<label htmlFor='message'>
						Message:
						<textarea rows='10' onChange={(e) => setDetails({ message: e.target.value })}></textarea>{' '}
					</label>
				</div>
				<button type='submit'>Send</button>
			</form>
		</React.Fragment>
	);
};

export default ContactUs;
