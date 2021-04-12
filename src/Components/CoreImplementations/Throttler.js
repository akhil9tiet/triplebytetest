import React, { useCallback, useState } from 'react';
import throttle from 'lodash.throttle';

function useThrottle(callback, delay) {
	const throttleFn = useCallback(
		throttle((...args) => callback(...args), delay),
		[delay]
	);
	return throttleFn;
}

export default function Throttler() {
	const [count, setCount] = useState(0);
	const [dbCount, setDbCount] = useState(0);

	// const throttle = (fn, delay) => {
	// 	let last = 0;
	// 	return function (...args) {
	// 		const now = new Date().getTime();
	// 		if (now - last < delay) {
	// 			return;
	// 		}
	// 		last = now;
	// 		return fn(...args);
	// 	};
	// };

	const handleChange = (event) => {
		const nextCount = count + 1;
		setCount(nextCount);
		throttledSave(nextCount);
	};

	const throttledSave = useThrottle((nextCount) => setDbCount(nextCount), 2000);

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
				<button
					style={{
						padding: '20px 140px 20px 140px',
						background: '#ee9897',
						fontSize: '24px',
					}}
					onClick={handleChange}>
					Press
				</button>
			</div>
			<div>
				<h1>Local Val {count}</h1>
			</div>
			<div>
				<h1>db Val {dbCount}</h1>
			</div>
		</div>
	);
}
