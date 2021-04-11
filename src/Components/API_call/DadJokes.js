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
		padding: '20px',
		marginLeft: '30vw',
		marginRight: '30vw',
		marginTop: '40vh',
		marginBottom: '40vh',
		textAlign: 'center',
		minWidth: '40vw',
		minHeight: '20vh',
		background: '#EBECED',
	},
	title: {
		fontSize: 20,
		padding: 10,
		borderRadius: 5,
		color: '#fff',
		backgroundColor: '#1652F0',
	},
	pos: {
		marginBottom: 12,
	},
});

const DadJokes = () => {
	const [joke, setJoke] = useState('');
	const classes = useStyles();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		try{
		const response = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
		setJoke(response.data)
		}catch(error){
			console.log(error)
		}
	}, []);
	
	const clickHandler = () => {
		// console.log('Chala');
		axios
			.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
			.then((res) => setJoke(res.data))
			.catch((err) => console.log(err));
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
					Next
				</Button>
			</CardActions>
		</Card>
	);
};

export default DadJokes;
