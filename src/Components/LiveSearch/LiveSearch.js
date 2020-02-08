import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import './LiveSearch.style.css';

const LiveSearch = () => {
	const [data, setData] = useState({
		query: '',
		results: {},
		loading: false,
		message: '',
	});
	// var cancel = '';

	// useEffect(() => {
	// 	fetchSearchResults(1, data.query);
	// });

	// const fetchSearchResults = (updatedPageNo = '', query) => {
	// 	const APIKEY = '147711-6a69afa9b78115196793951c0';
	// 	const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : ``;
	// 	const searchUrl = `https://pixabay.com/api/?key=${APIKEY}&q=${query}${pageNumber}`;

	// 	if (cancel) {
	// 		cancel.cancel();
	// 	}
	// 	cancel = axios.CancelToken.source();
	// 	axios
	// 		.get(searchUrl, {
	// 			cancelToken: cancel.token,
	// 		})
	// 		.then((res) => {
	// 			const resultNotFoundMsg = !res.data.hits.length
	// 				? 'There are no more search results. Try new search.'
	// 				: '';
	// 			setData({ results: res.data.hits, message: resultNotFoundMsg, loading: false });
	// 			console.log(res.data.hits);
	// 		})
	// 		.catch((err) => {
	// 			if (axios.cancel(err) || err) {
	// 				setData({ loading: false, message: 'Failed to fetch data' });
	// 			}
	// 		});
	// };

	useEffect(() => {
		const APIKEY = '147711-6a69afa9b78115196793951c0';
		// const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : ``;
		const searchUrl = `https://pixabay.com/api/?key=${APIKEY}&q=${data.query}`;
		axios
			.get(searchUrl)
			.then((res) => {
				data.results = res.data.hits;
			})
			.catch((err) => console.log(err));
	}, [data.query, data.results]);

	const renderSearchResults = () => {
		const results = data.results;
		if (Object.keys(results).length && results.length) {
			return (
				<div className='results__container'>
					{results.map((result) => {
						return (
							<a key={result.id} href={result.previewURL} className='result__item'>
								<h6 className='image__username'>{result.username}</h6>
								<div className='image__wrapper'>
									<img className='image' src={result.previewURL} alt={result.username} />
								</div>
							</a>
						);
					})}
				</div>
			);
		}
	};

	const handleOnInputChange = (event) => {
		const query = event.target.value;
		setData({ query: query, loading: true, message: '' });
	};

	return (
		<div className='liveSearch__container'>
			<h2 className='liveSearch__heading'>Live Search:</h2>
			<label className='search-label' htmlFor='search-input'>
				<input
					type='text'
					name='query'
					value={data.query}
					id='search-input'
					placeholder='Search'
					onChange={handleOnInputChange}
				/>
				<SearchIcon className='liveSearch__icon' />
			</label>
			{renderSearchResults}
		</div>
	);
};

export default LiveSearch;
