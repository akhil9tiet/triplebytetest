import React, { useState, useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Dropdown = ({ callbackFromParent }) => {
	const node = useRef();
	const handleClick = (e) => {
		if (node.current.contains(e.target)) {
			return; //inside click
		}
		callbackFromParent(false); //outside click
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<div className='dropdown' style={{ backgroundColor: '#c3c3c3' }}>
				<Grid container ref={node}>
					<Grid item xs={12}>
						<h1>This is the child component</h1>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<ul>
							<li onClick={() => callbackFromParent(false)}>List item 1</li>
							<li onClick={() => callbackFromParent(false)}>List item 2</li>
							<li onClick={() => callbackFromParent(false)}>List item 3</li>
							<li onClick={() => callbackFromParent(false)}>List item 4</li>
						</ul>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<ul>
							<li onClick={() => callbackFromParent(false)}>Grid List 1</li>
							<li onClick={() => callbackFromParent(false)}>Grid List 1</li>
							<li onClick={() => callbackFromParent(false)}>Grid List 1</li>
							<li onClick={() => callbackFromParent(false)}>Grid List 2</li>
						</ul>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
};

const SendPropsUp = () => {
	const [listOpen, setListOpen] = useState(false);
	const myCallback = (listOpen) => {
		setListOpen(listOpen);
	};
	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={12}>
					<h1>This is the parent component</h1>
				</Grid>
			</Grid>
			<Grid container>
				<Tabs>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<Tab label='OpenList' onClick={() => setListOpen(!listOpen)} />
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<Tab label='Dummy1' />
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<Tab label='Dummy2' />
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<Tab label='Dummy3' />
					</Grid>
				</Tabs>
			</Grid>
			<Grid container>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					{listOpen ? <Dropdown callbackFromParent={myCallback} /> : null}
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default SendPropsUp;
