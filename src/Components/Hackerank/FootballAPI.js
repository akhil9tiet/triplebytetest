import React, { useState, useEffect } from 'react';

export default function () {
	// const [data, setData] = useState({});
	const [goals, setGoals] = useState(0);
	const [input, setInput] = useState({ year: '', team: '' });
	const [hasSubmit, setHasSubmit] = useState(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps

	function apiCall(team, year) {}

	const onChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setInput({ ...input, [key]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		let pages = 1;

    setHasSubmit(true)

		const teamsParam = ['team1', 'team2'];
		for (let teamParam of teamsParam) {
			for (let i = 1; i <= pages; i++) {
				let url = `https://jsonmock.hackerrank.com/api/football_matches?year=${input.year}&${teamParam}=${input.team}&page=${i}`;
				const response = await fetch(url);
				// console.log(response);
				const { page, per_page, total, total_pages, data } = await response.json();
				console.log(data);
				if (pages === 1) {
					pages = total_pages;
				}

				// data.reduce((localgoals, game) => (localgoals += Number(game[`${teamParam}goals`])), goals);
				setGoals((oldGoals) =>
					data.reduce(
						(localgoals, game) => (localgoals += Number(game[`${teamParam}goals`])),
						oldGoals + goals
					)
				);
			}
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={onSubmit}>
				<div>
					<label>Year</label>
					<input name='year' onChange={onChange} />
				</div>
				<div>
					<label>Team</label>
					<input name='team' onChange={onChange} />
				</div>
				<button type='submit'>submit</button>
			</form>
			{input.team && input.year && hasSubmit? (
				<h1>
					Toal goals by {input.team} in the year {input.year} are {goals}
				</h1>
			) : null}
		</React.Fragment>
	);
}
