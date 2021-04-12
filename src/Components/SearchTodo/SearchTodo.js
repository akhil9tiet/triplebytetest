import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NoEncryption } from '@material-ui/icons';

const useStyles = makeStyles({
	input: {
		padding: '20px',
		width: '30vw',
		color: '#1652F0',
		fontSize: '20px',
	},
	button: {
		color: '#1652F0',
		listStyle: 'none!important',
		fontSize: '20px!important',
		background: '#EBECED',
	},
	buttonAdd: {
		color: '#F05216',
		listStyle: 'none!important',
		fontSize: '20px!important',
		background: '#EBECED',
		textDecoration: 'bold',
		alignItems: 'left',
		justifyContent: 'left',
	},
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
		marginTop: '10px',
		justifyItems: 'left',
		borderRadius: 5,
		color: '#3e33ee',
	},
	pos: {
		marginBottom: 12,
	},
});
const SearchTodo = () => {
	const [val, setVal] = useState(null);
	const [list, setList] = useState([]);
	const [filterTerm, setFilterTerm] = useState('');
	const classes = useStyles();

	const setFilterHandler = () => {
		const orignalList = list;
	};
	return (
		<Card className={classes.card}>
			<CardContent>
				<input className={classes.input} type='text' value={val} onChange={(e) => setVal(e.target.value)} />
			</CardContent>
			<CardActions>
				<Button className={classes.buttonAdd} size='small' onClick={() => setList([...list, val])}>
					Add
				</Button>
			</CardActions>

			<Typography className={classes.title} color='textSecondary' gutterBottom>
				<ul>
					{list
						.map((el, i) => (
							<li key={i}>
								<button
									className={classes.button}
									onClick={() => setList(list.filter((e) => e !== el))}>
									{el}
								</button>
							</li>
						))}
				</ul>
			</Typography>
		</Card>
	);
};

export default SearchTodo;
