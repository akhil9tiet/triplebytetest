import React, { useState } from 'react';

const InputValidator = () => {
	let [val, setVal] = useState('');
	let [errmessage, setErrMessage] = useState('');

	function valHandler(e) {
		// e.prevent.default();
		let inputVal = e.target.value;
		setVal(inputVal);

		let valArr = inputVal.split('');
		let lastDigit = valArr[valArr.length - 1];

		if (lastDigit === '%') {
			valArr.pop();
		}

		if (!Number(valArr.join(''))) {
			setErrMessage('Please enter a valid interest rate.');
		} else {
			setErrMessage('');
		}
	}

	return (
		<div>
			<form style={{ left: '45vw', top: '30vh', position: 'relative' }}>
				<label to='interest'>Interest Rate: </label>
				<br />
				<input
					style={{ height: '50px', width: '300px', fontSize: '24px' }}
					type='text'
					id='interest'
					name='interest'
					placeholder='%'
					defaultValue={val}
					onChange={valHandler}
					// onKeyDown={(e) => e.target.value.match[/^[0-9]/]}
				/>
				<div
					id='interestError'
					className='error hidden'
					style={{ height: '50px', width: '300px', fontSize: '24px', paddingTop: '20px' }}>
					{errmessage}
				</div>
			</form>
		</div>
	);
};

export default InputValidator;
