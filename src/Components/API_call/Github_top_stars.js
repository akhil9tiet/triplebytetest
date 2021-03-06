import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const fetchData = async (page) => {
	let response = await fetch(
		`https://api.github.com/search/repositories?q=sort:stars&q=language:javascript&q=page:${page}`
	);
	return response.json();
};

const useStyles = makeStyles({
	content: {
		display: 'flex',
		flexWrap: 'wrap',
		listStyle: 'none',
		marginBottom: '5vh',
	},
	card: {
		borderRadius: '50px',
		background: '#d6e3f0',
		flex: `1 1 160px`,
		padding: '20px',
		marginLeft: '2vw',
		marginTop: '2vh',
		textAlign: 'center',
		minWidth: '20vw',
		minHeight: '20vh',
	},
	title: {
		fontSize: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent:'center',
		padding: 10,
		borderRadius: 5,
		color: '#9d9dad',
		backgroundColor: '#d6e3f0',
	},
	pos: {
		marginBottom: 12,
		color: '#9d9dad',
	},
	footer: {
		bottom: 0,
		padding: '20px 50px 20px 50px',
		minWidth: '100vw',
		position: 'fixed',
		alignContent: 'center',
		backgroundColor: '#4d4d4d',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0 5px',
		padding: '8px 24px',
		background: '#9d9dad',
		color: '#444',
		cursor: 'pointer',
		fontWeight: '300',
	},
	disable: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0 5px',
		padding: '8px 24px',
		fontWeight: '300',
		background: '#d5d5d5',
		color: '#eee',
		pointerEvents: 'none',
		cursor: 'not-allowed',
	},
});

function reducer(state, action) {
	switch (action.type) {
		case 'next':
			return { page: state.page + 1 };
		case 'prev':
			return { page: state.page - 1 };
		default:
			return { page: state.page };
	}
}

export default function GetTopStars() {
	// let [page, setPage] = useState(1);
	const initialState = { page: 1 };
	let [data, setData] = useState([]);
	let [state, dispatch] = useReducer(reducer, initialState);

	const classes = useStyles();

	useEffect(() => {
		fetchData(state.page).then((res) => setData(res.items.sort((a, b) => b.stargazers_count - a.stargazers_count)));
	}, [state.page]);

	return (
		<React.Fragment>
			<div className={classes.container}>
				{!data.length ? (
					<CircularProgress />
				) : (
					<div>
						<div className='title'>
							<h1>Top Starred Javascript repos</h1>
							<p>Showing page {state.page}</p>
						</div>
						<div className={classes.content}>
							{(data || []).map((repo, index) => (
								<div key={index}>
									<div className={classes.card}>
										<img src={repo.owner.avatar_url} height={100} width={100} alt={index} />
										<h1 className={classes.title}>{repo.name}</h1>
										<h2 className={classes.pos}>{repo.stargazers_count}</h2>
									</div>
								</div>
							))}
						</div>
						<div className={classes.footer}>
							<button
								className={state.page > 1 ? classes.button : classes.disable}
								onClick={() => (state.page > 1 ? dispatch({ type: 'prev' }) : dispatch({ type: '' }))}>
								Prev
							</button>
							<button
								className={data ? classes.button : classes.disable}
								onClick={() => dispatch({ type: 'next' })}>
								Next
							</button>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}
