import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export default function Debouncer() {
	const [value, setValue] = useState('');
	const [dbValue, setDbValue] = useState('');

	/************************************************************** */
	/*
  Debounce function self implementation
  */

	// const debounce = (fn, delay) => {
	// 	let timeOutID;

	// 	return function (...args) {
	// 		if (timeOutID) {
	// 			clearTimeout(timeOutID);
	// 		}
	// 		timeOutID = setTimeout(() => {
	// 			fn(...args);
	// 		}, delay);
	// 	};
	// };
	/************************************************************** */


  
	/*
  useCallback helps us to create this function only once as component mounts
  the callback function will be memoized and be called only once when the component mounts
  */
	const debouncedSave = useCallback(
		debounce((nextValue) => setDbValue(nextValue), 2000),
		[]
	);

	const handleChange = (event) => {
		const nextValue = event.target.value;
		setValue(nextValue);
		debouncedSave(nextValue);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginLeft: '240px',
				alignItems: 'flex-start',
				justifyContent: 'center',
				height: '30vh',
				width: '50vw',
			}}>
			<div>
				<input
					style={{
						padding: '20px 10px 20px 10px',
						background: '#ddddd',
						fontSize: '24px',
					}}
					value={value}
					onChange={handleChange}
				/>
			</div>
			<div>
				<h1>Local Val</h1>
				<p>{value}</p>
			</div>
			<div>
				<h1>DB Val</h1>
				<p>{dbValue}</p>
			</div>
		</div>
	);
}
