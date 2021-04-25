import React, { useState } from 'react';
import './SignupForm.css';

const useForm = ({ validation, onSubmit }) => {
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState();
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const onInputChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [key]: value });

		if (isFormSubmitted) {
			setErrors({ ...errors, [key]: !validation[key]?.(value) });
		}
	};

	const hasErrors = () => {
		const newErrors = {};
		Object.keys(validation).forEach((key) => (newErrors[key] = !validation[key](form[key] || '')));
		setErrors(newErrors);
		return Object.keys(validation).some((key) => newErrors[key]);
	};

	const _onSubmit = (e) => {
		e.preventDefault();
		setIsFormSubmitted(true);
		if (!hasErrors()) {
			onSubmit();
		}
	};

	return [form, errors, _onSubmit, onInputChange];
};

export default function SignupForm() {
	const [form, errors, onSubmit, onChange] = useForm({
		validation: {
			email: (value) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
			password: (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value),
		},
		onSubmit: (e) => {
			console.log('form ready', form);
		},
	});
  
	return (
		<div className='container'>
			<form onSubmit={onSubmit}>
				<div className='input-container'>
					<label>Email</label>
					<br />
					<input autoComplete='off' name='email' onChange={onChange} />
				</div>

				<div className='input-container'>
					<label>Password</label>
					<br />
					<input autoComplete='off' name='password' type='password' onChange={onChange} />
				</div>

				{/* <p>{errors}</p> */}

				<button type='submit'>Sign in</button>
			</form>
		</div>
	);
}
