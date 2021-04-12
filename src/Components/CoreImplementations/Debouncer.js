import React, { useState } from 'react';
import debounce from 'lodash.debounce';

export default function Debouncer() {
	const [data, ShowData] = useState(null);

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
						background: '#97ee98',
						fontSize: '24px',
					}}
          /*My Implementation*/
					// onClick={debounce((e) => {
					// 	ShowData('hello');
					// }, 2000)}

          /*Lodash Usage*/
					onClick={debounce((e) => {
						ShowData('hello');
					}, 2000)}>
					Press
				</button>
			</div>
			<div>
				<h1>{data}</h1>
			</div>
		</div>
	);
}
