import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import './ContactUs.css';

const ContactUs = () => {
	const [details, setDetails] = useState({
		name: '',
		email: '',
		message: ''
	});

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setDetails({ ...details, [name]: value });
	};

	const submitHandler = (event) => {
		console.log('state', details);
		event.preventDefault(); // event has a method which prevents page refreshings
	};

	return (
		<React.Fragment>
			{/* {!details ? ( */}
				<form onSubmit={submitHandler}>
					<div className='form-group'>
						<label>
							Name:
							<input
								type='text'
								name='name'
								placeholder='Alex'
								value={details.name}
								onChange={inputChangeHandler}
							/>
						</label>
						<label htmlFor='exampleInputEmail1'>
							Email:{' '}
							<input
								type='email'
								name='email'
								placeholder='alex@xyz.com'
								value={details.email}
								aria-describedby='emailHelp'
								onChange={inputChangeHandler}
							/>
						</label>
						<label htmlFor='message'>
							Message:
							<textarea
								type='text'
								name='message'
								placeholder='Your Message'
								value={details.message}
								rows='10'
								onChange={inputChangeHandler}></textarea>{' '}
						</label>
					</div>
					<button type='submit'>Send</button>
				</form>
			{/* ) : (
				<p>Your message has been received</p>
			)} */}
		</React.Fragment>
	);
};

export default ContactUs;
