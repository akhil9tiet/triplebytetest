import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export default function GetTopStars() {
	let [page, setPage] = useState(1);
	let [data, setData] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		fetchData(page).then((res) => setData(res.items.sort((a, b) => b.stargazers_count - a.stargazers_count)));
	}, [page]);

	return (
		<React.Fragment>
			<div className={classes.container}>
				<div className='title'>
					<h1>Top Starred Javascript repos</h1>
					<p>Showing page {page}</p>
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
						className={page > 1 ? classes.button : classes.disable}
						onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))}>
						Prev
					</button>
					<button className={data ? classes.button : classes.disable} onClick={() => setPage(page + 1)}>
						Next
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
