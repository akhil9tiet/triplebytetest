import React, { useState, createRef, useEffect } from 'react';

const ScrollProgress = (target) => {
	const [scrollPosition, setSrollPosition] = useState(0);
	console.log(scrollPosition);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setSrollPosition(position);
	};

	//component Did Mount
	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
	}, []);

	//component will Unmount
	useEffect(() => {
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const target1 = createRef();

	return (
		<React.Fragment>
			<h1
				style={{
					position: 'sticky',
					left: 0,
					width: 30,
					top: 0,
					backgroundColor: '#fee000',
				}}
				target={target1}>
				{scrollPosition}
			</h1>
			<h1
				style={{
					height: 4000,

					left: 400,
					backgroundColor: '#3e4567',
				}}
				ref={target1}>
				Show me the numbers
			</h1>
		</React.Fragment>
	);
};

export default ScrollProgress;
