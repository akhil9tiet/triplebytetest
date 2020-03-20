import React, { useState } from 'react';

const TrafficLight = () => {
	const [lights, setLights] = useState({ light: ['red', 'black', 'black'], start: true });

	const lightsHandler = () => {
		setLights({ ...lights, start: !lights.start });

		if (lights.start) {
			setInterval(() => setLights({ ...lights, light: ['black', 'yellow', 'black'] }), 1000);
			setInterval(() => setLights({ ...lights, light: ['black', 'black', 'green'] }), 1000);
			setInterval(() => setLights({ ...lights, light: ['red', 'black', 'black'] }), 1000);
		} else {
		}
	};
	return (
		<React.Fragment>
			<div style={{ padding: 30 }}>
				<svg height='100' width='100'>
					<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill={lights.light[0]} />
				</svg>
				<svg height='100' width='100'>
					<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill={lights.light[1]} />
				</svg>
				<svg height='100' width='100'>
					<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill={lights.light[2]} />
				</svg>
				<br />

				<button style={{ padding: 10, backgroundColor: '#3e4555' }} onClick={lightsHandler}>
					{lights.start ? 'Start' : 'End'}
				</button>
			</div>
		</React.Fragment>
	);
};

export default TrafficLight;
