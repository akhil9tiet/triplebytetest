import React, { useEffect, useState } from 'react';
import imdb, { Client } from 'imdb-api';
import HeatmapChart from './HeatmapChart';

const IMDBapi = () => {
	const [data, setData] = useState(null);
	var seriesName = 'The Office';
	useEffect(() => {
		// const cli = new Client({ apiKey: '81e1b710' });
		const cli = new Client({ apiKey: 'd19ea01b' });

		cli.get({ name: seriesName })
			.then((things) => {
				return things.episodes();
			})
			.then((eps) => {
				// setData(eps);
				setData(eps.filter((el) => el.name !== undefined));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log('@@IMDB API DATA', data);
	// console.log('@@IMDB API DATA', JSON.stringify(data));

	const newDataFormatter = (d) => {
		var newData = [];
		var seasonsArr = [];

		d.map((el) => seasonsArr.push(el['season']));

		var seasonsArrUnique = [...new Set(seasonsArr)]; //remove duplicates
		seasonsArrUnique.forEach((season) =>
			// newData.push({ season: season, episodes: data.filter((e) => e.season === season) })
			newData.push({
				bin: season,
				/*****************************************************
				 * The code lines from 45 to 50 have been with the help of this great person from Reddit u/GreenSnow02.
				 * https://www.reddit.com/r/reactjs/comments/gjzmlp/data_formatting_question/
				 ******************************************************/
				bins: d.reduce((accum, e) => {
					if (e.season === season) {
						accum.push({
							bin: e.episode * 150,
							count: e.rating,
							//todo
              title:e.title,
              imdburl:e.imdburl,
							release:e.released,
						});
					}
					return accum;
				}, []), // [] set accum as an empty array to begin with
				/***************************************************** */
			})
		);
		// var filteredData = newData.map((el) => {...el, bins:[el.bins.filter((e) => e)]	x});
		// return filteredData;
		return newData;
	};

	// console.log('@@newData', newDataFormatter(data));

	if (data === null) {
		return <p>Loading ...</p>;
	}
	// return <p>loadfing</p>;
	return (
		<React.Fragment>
			{/* <div style={{ height: 'initial', 'text-align': 'center' }}> */}
			<h2>{seriesName}</h2>
			<HeatmapChart data={newDataFormatter(data)} />
			{/* </div> */}
		</React.Fragment>
	);
};

export default IMDBapi;
