import React from 'react';

export const FormInput = ({ key, values, setValues, label, name, inputMode, required }) => {
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	console.log(values);

	return (
		<React.Fragment>
			<label>{label}</label>
			<input name={name} type={inputMode} onChange={handleChange} required={required} />
		</React.Fragment>
	);
};
