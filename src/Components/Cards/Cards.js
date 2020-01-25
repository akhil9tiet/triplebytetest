import React, * as react from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Cards.css';

const Columns = (props) => {
	const [card, setCard] = react.useState([]);

	function appendChild() {
		// console.log(card);
		setCard([...card, 'NewCard']);
	}

	return (
		<div>
			<h1 style={{ backgroundColor: props.color }}>{props.name}</h1>
			<p>Crd1</p>
			<p>Crd2</p>
			{card && card.map((e, i) => <p key={i}>{e}</p>)}
			<button onClick={appendChild}>+Add a card</button>
		</div>
	);
};

const Cards = () => {
	return (
		<React.Fragment>
			<Grid container className='card-container' spacing={3}>
				<Grid item className='card-item' xs={3}>
					<Paper>
						<Columns name='Tony' color='#8e6e95' />
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper>
						<Columns name='george' color='#6e8e95' />
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper>
						<Columns name='Micheal' color='#958e6e' />
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper>
						<Columns name='Dwight' color='#8e956e' />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default Cards;
