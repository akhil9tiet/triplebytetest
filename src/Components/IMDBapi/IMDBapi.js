import React, { useEffect, useState } from 'react';
import imdb, { Client } from 'imdb-api';
import HeatmapChart from './HeatmapChart';
// import TooltipCard from './TooltipCard';

const IMDBapi = () => {
	const [data, setData] = useState(null);
	// var seriesName = 'South Park';
	// var seriesName = 'Silicon Valley';
	var seriesName = 'Game of thrones';
	useEffect(() => {
		// const cli = new Client({ apiKey: '81e1b710' });
		const cli = new Client({ apiKey: 'd19ea01b' });

		cli.get({ name: seriesName })
			.then((things) => {
				return things.episodes();
			})
			.then((eps) => {
				setData(eps.filter((el) => el.name !== undefined));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log('@@IMDB API DATA', data);

	const newDataFormatter = (d) => {
		var newData = [];
		var seasonsArr = [];

		d.map((el) => seasonsArr.push(el['season']));

		var seasonsArrUnique = [...new Set(seasonsArr)]; //remove duplicates
		seasonsArrUnique.forEach((season) =>
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
							title: e.title,
							imdbid: e.imdbid,
							imdburl: e.imdburl,
							release: e.released,
						});
					}
					return accum;
				}, []), // [] set accum as an empty array to begin with
				/***************************************************** */
			})
		);
		return newData;
	};

	if (data === null) {
		return <p>Loading ...</p>;
	}
	return (
		<React.Fragment>
			<h2>{seriesName}</h2>
			{/* <TooltipCard episodeid={tooltipData?.bin?.imdbid} /> */}
			<HeatmapChart data={newDataFormatter(data)} />

			{/* </div> */}
		</React.Fragment>
	);
};

export default IMDBapi;
