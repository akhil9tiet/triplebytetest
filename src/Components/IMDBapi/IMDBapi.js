import React, { useEffect, useState } from 'react';
import imdb, { Client } from 'imdb-api';
import HeatmapChart from './HeatmapChart';
import { max } from 'd3';
// import imdb = require('imdb-api');

const IMDBapi = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		const cli = new Client({ apiKey: '81e1b710' });

		cli.get({ name: 'Silicon Valley' })
			.then((things) => {
				return things.episodes();
			})
			.then((eps) => {
				// setData(eps);
				setData(eps.filter((el) => el.name !== undefined));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const newDataFormatter = (data) => {
		const newData = [];
		var seasonsArr = [];

		data.map((el) => seasonsArr.push(el['season']));

		var seasonsArrUnique = [...new Set(seasonsArr)]; //remove duplicates
		seasonsArrUnique.forEach((season) =>
			newData.push({ season: season, episodes: data.filter((e) => e.season === season) })
		);
		return newData;
	};
	if (data === null) {
		console.log('@@loading');
		return <p>Loading ...</p>;
	}
	return <HeatmapChart data={newDataFormatter(data)} />;
};

export default IMDBapi;
