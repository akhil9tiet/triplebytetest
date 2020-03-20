import React, { useState, createRef, useEffect } from 'react';

const ReadingProgress = ({ target }) => {
	const [readingProgress, setReadingProgress] = useState(0);
	const scrollListener = () => {
		if (!target.current) {
			return;
		}

		const element = target.current;
		const totalHeight = element.clientHeight - element.offsetTop - window.innerHeight;
		const windowScrollTop =
			window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

		if (windowScrollTop === 0) {
			return setReadingProgress(0);
		}

		if (windowScrollTop > totalHeight) {
			return setReadingProgress(100);
		}

		setReadingProgress((windowScrollTop / totalHeight) * 100);
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollListener);
		return () => window.removeEventListener('scroll', scrollListener);
	});

	return (
		<div
			className={'progress-bar'}
			style={{
				width: `${readingProgress}%`,
				position: 'sticky',
				height: '5px',
				top: 0,
				backgroundColor: '#fee000',
			}}
		/>
	);
};

const SVGPathScroller = () => {
	const bodyStyle = {
		backgroundColor: '#1f1f8e',
		color: '#fff',
		padding: 50,
		height: 2000,
	};

	const target = createRef();

	return (
		<React.Fragment>
			<ReadingProgress target={target} />
			<div className='body' ref={target} style={bodyStyle}>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
				<h1>PathScroller</h1>
			</div>
		</React.Fragment>
	);
};

export default SVGPathScroller;
