/*
Build a react component that can display a form to a user based on dynamic input to the component describing the structure of the form.
A form can contain several types of imput from a user:
- text input (single line)
- text input (multi line)
- single select from a list of options (or radio button)
- multiselect from a list of options (or checkbox)

The form component should take a prop describing a form with the following javascript obeject structure

*/
import React, { useState } from 'react';
import './ContactUs.css';
import { formSchema } from './formSchema';
import { FormInput } from './FormInput';

const ContactUs = () => {
	const [values, setValues] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		//POST request here

		alert(values);
	};

	return (
		<form onSubmit={handleSubmit}>
			{formSchema.map((entry) => (
				<FormInput
					key={entry.order}
					values={values}
					setValues={setValues}
					label={entry.display_name}
					name={entry.field}
					inputMode={entry.type}
					required={true}
				/>
			))}
			<button type='submit'>Submit</button>
		</form>
	);
};

export default ContactUs;
