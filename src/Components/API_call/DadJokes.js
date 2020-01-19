import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	card: {
		minWidth: 275
	},
	title: {
		fontSize: 14,
		backgroundColor: '#0051dc'
	},
	pos: {
		marginBottom: 12
	}
});

const DadJokes = () => {
	const [joke, setJoke] = useState('hahahaha');
	const classes = useStyles();

	useEffect(() => {
		axios
			.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	});

	const clickHandler = () => {
		console.log('Chala');
	};

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.title} color='textSecondary' gutterBottom>
					{joke.joke}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small' onClick={clickHandler}>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
};

export default DadJokes;
