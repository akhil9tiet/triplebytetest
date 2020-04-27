import React, { useEffect, useState } from 'react';
import imdb, { Client } from 'imdb-api';
// import imdb = require('imdb-api');

const IMDBapi = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const cli = new Client({ apiKey: '81e1b710' });

		cli.get({ name: 'The Tiger King' })
			.then((things) => {
				return things.episodes();
			})
			.then((eps) => {
				setData(eps);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log('eps', data);

	return <p>IMDBapi</p>;
};

export default IMDBapi;
