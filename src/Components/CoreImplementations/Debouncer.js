import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

/*
  useCallback helps us to create this function only once as component mounts
  the callback function will be memoized and be called only once when the component mounts
  */
	function useDebounce(callback, delay) {
		const debouncedFn = useCallback(
			debounce((...args) => callback(...args), delay),
			[delay]
		);
		return debouncedFn;
	}

export default function Debouncer() {
	const [value, setValue] = useState('');
	const [dbValue, setDbValue] = useState('');

	/****************************__________________Debounce function self implementation___________________********************************** */
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
	/****************************_______*__________Debounce function self implementation*________*_________********************************* */

	const handleChange = (event) => {
		const nextValue = event.target.value;
		setValue(nextValue);
		debouncedSave(nextValue);
	};
	
	
	const debouncedSave = useDebounce((nextVal) => setDbValue(nextVal), 1000);

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
