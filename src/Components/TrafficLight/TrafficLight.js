import React, { useState } from 'react';

const TrafficLight = () => {
	const [light, setLight] = useState(100);
	var lightarr = ['red', 'black', 'black'];

	if (light === 100) {
		lightarr = ['red', 'black', 'black'];
		setInterval(() => setLight(10), 2000);
	} else if (light === 10) {
		lightarr = ['black', 'yellow', 'black'];
		setInterval(() => setLight(1), 2000);
	} else {
		lightarr = ['black', 'black', 'green'];
		setInterval(() => setLight(100), 2000);
	}

	return (
		<React.Fragment>
			<svg height='100' width='100'>
				<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill={lightarr[0]} />
			</svg>
			<svg height='100' width='100'>
				<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill={lightarr[1]} />
			</svg>
			<svg height='100' width='100'>
				<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill={lightarr[2]} />
			</svg>
		</React.Fragment>
	);
};

export default TrafficLight;
