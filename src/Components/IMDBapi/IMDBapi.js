import React, { useEffect, useState } from 'react';
import imdb, { Client } from 'imdb-api';
import HeatmapChart from './HeatmapChart';
// import imdb = require('imdb-api');

const IMDBapi = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const cli = new Client({ apiKey: '81e1b710' });

		cli.get({ name: 'Silicon Valley' })
			.then((things) => {
				return things.episodes();
			})
			.then((eps) => {
				setData(eps);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log('eps', data);

	return <HeatmapChart />;
};

export default IMDBapi;
