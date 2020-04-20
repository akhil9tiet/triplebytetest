import React, { useEffect } from 'react';
import imdb, { Client } from 'imdb-api';
// import imdb = require('imdb-api');

const IMDBapi = () => {
	// useEffect(() => {
	// 	const cli = new imdb.Client({ apiKey: '81e1b710' });
	// 	cli.search({ name: 'The Toxic Avenger' }).then((search) => {
	// 		for (const result of search.results) {
	// 			console.log(result.title);
	// 		}
	// 	});
	// });

	const cli = new Client({ apiKey: '81e1b710' });
	// cli.search({ name: 'The Toxic Avenger' }).then((search) => {
	// 	for (const result of search.results) {
	// 		console.log(result.title);
	// 	}
	// });
	cli.get({ name: 'Entourage' })
		.then((things) => {
			return things.episodes();
		})
		.then((eps) => {
			console.log(eps);
		});

	return <p>IMDBapi</p>;
};

export default IMDBapi;
