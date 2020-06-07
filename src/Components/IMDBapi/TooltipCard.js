import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Client } from 'imdb-api';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import './TooltipCard.css';

const TooltipCard = ({ episodeid }) => {
	const [data, setData] = useState(null);
	// console.log('episodeid', episodeid);
	/*{
												"title":"Company Picnic",
												"_year_data":"2009",
												"year":2009,
												"rated":"TV-PG",
												"released":"2009-05-14T07:00:00.000Z",
												"season":30,
												"episode":26,
												"runtime":"30 min",
												"genres":"Comedy",
												"director":"Ken Kwapis",
												"writer":"Greg Daniels (developed for american television by), Jennifer Celotta, Paul Lieberstein, Ricky Gervais (creator), Stephen Merchant (creator)",
												"actors":"Steve Carell, Rainn Wilson, John Krasinski, Jenna Fischer",
												"plot":"Michael runs into Holly at the company picnic, and the two of them accidentally reveal that the Buffalo branch is closing during a comedy skit before corporate has made the announcement.",
												"languages":"English",
												"country":"N/A",
												"awards":"N/A",
												"poster":"https://m.media-amazon.com/images/M/MV5BMTMwMTMyNDg2OV5BMl5BanBnXkFtZTcwNTI4MTY1Mg@@._V1_SX300.jpg",
												"ratings":[{"Source":"Internet Movie Database","Value":"9.0/10"}],
												"metascore":"N/A",
												"rating":9,
												"votes":"2366",
												"imdbid":"tt1417732",
												"seriesid":"tt0386676",
												"type":"episode",
												"response":"True",
												"name":"Company Picnic",
												"series":true,
												"imdburl":"https://www.imdb.com/title/tt1417732"
											}
											*/
	useEffect(() => {
		const cli = new Client({ apiKey: 'd19ea01b' });
		cli.get({ id: episodeid }).then((things) => {
			setData({
				imdbid: things.imdbid,
				title: things.title,
				rating: things.rating,
				runtime: things.runtime,
				plot: things.plot,
				poster: things.poster,
				imdburl: things.imdburl,
			});
		});
	}, [episodeid]);
	console.log('@@Data', JSON.stringify(data));
	return (
		<Card style={{ height: '100%', width: 500 }}>
			<CardMedia style={{ height: 250, width: '40%' }} image={data?.poster} title='poster' />
			<div className='details'>
				<CardContent className='content'>
					<Typography variant='h4'>{data?.title}</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						{data?.plot}
					</Typography>
					<div className={'controls'}>
						<p>Rating: {data?.rating}</p>
						<Box component='fieldset' mb={3} borderColor='transparent'>
							<Rating value={5} max={10} defaultValue={2.5} precision={0.5} readOnly />
							{/* <Rating name='read-only' value={data?.rating} readOnly /> */}
						</Box>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default TooltipCard;
