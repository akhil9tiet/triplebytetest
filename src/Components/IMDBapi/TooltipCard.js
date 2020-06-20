import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Client } from 'imdb-api';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import './TooltipCard.css';

const TooltipCard = ({ episodeid }) => {
	const [data, setData] = useState(null);
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
		<Card className='card__root'>
			<CardMedia className='card__cover' image={data?.poster} title='poster' />
			<div className='card__details'>
				<CardContent className='card__content'>
					<Typography variant='h4'>{data?.title}</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						{data?.plot}
					</Typography>
					<div className='card__controls'>
						<p>Rating: {data?.rating}</p>
						<Box component='fieldset' mb={3} borderColor='transparent'>
							{/* <Rating value={5} max={10} defaultValue={2.5} precision={0.5} readOnly /> */}
							{/* <Rating name='read-only' value={data?.rating} readOnly /> */}
						</Box>
					</div>
				</CardContent>
			</div>
		</Card>
		// <Card borderColor='transparent' style={{ height: '100%', width: 500, border: 'none' }}>
		// 	<CardMedia style={{ height: 250, width: '40%' }} image={data?.poster} title='poster' />
		// 	<div className='details'>
		// 		<CardContent className='content'>
		// 			<Typography variant='h4'>{data?.title}</Typography>
		// 			<Typography variant='subtitle1' color='textSecondary'>
		// 				{data?.plot}
		// 			</Typography>
		// 			<div className={'controls'}>
		// 				<p>Rating: {data?.rating}</p>
		// 				<Box component='fieldset' mb={3} borderColor='transparent'>
		// 					{/* <Rating value={5} max={10} defaultValue={2.5} precision={0.5} readOnly /> */}
		// 					{/* <Rating name='read-only' value={data?.rating} readOnly /> */}
		// 				</Box>
		// 			</div>
		// 		</CardContent>
		// 	</div>
		// </Card>
	);
};

export default TooltipCard;
