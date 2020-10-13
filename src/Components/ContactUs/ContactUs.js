/*
Build a react component that can display a form to a user based on dynamic input to the component describing the structure of the form.
A form can contain several types of imput from a user:
- text input (single line)
- text input (multi line)
- single select from a list of options (or radio button)
- multiselect from a list of options (or checkbox)

The form component should take a prop describing a form with the following javascript obeject structure

[
	{
		order: 1,
		field: 'first_name',
		display_name: 'First name',
		type: 'string',
		required: true
	},
	{
		order: 2,
		field: 'last_name',
		display_name: 'Last name',
		type: 'string',
		required: true
	},
	{
		order: 3,
		field: 'age',
		display_name: 'Age',
		type: 'number',
		required: false
	},
	{
		order: 3,
		field: 'user_type',
		display_name: 'User Type',
		type: 'select',
		required: false,
		options:['shareholder','investor','other']
	}
]


*/

import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
	const [details, setDetails] = useState({
		name: '',
		email: '',
		message: '',
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
