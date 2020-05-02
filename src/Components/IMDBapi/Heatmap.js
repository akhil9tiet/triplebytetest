import React, { useState, useRef, useEffect } from 'react';
import { select } from 'd3';

const Heatmap = () => {
	const svgRef = useRef();
	const [data, setData] = useState([25, 30, 45, 60, 20]);
	var margin = { top: 80, right: 25, bottom: 30, left: 40 },
		width = 450 - margin.left - margin.right,
		height = 450 - margin.top - margin.bottom;

	useEffect(() => {
		const svg = select(svgRef.current); // after doing this we have d3 functions availavble
		svg.selectAll('circle')
			.data(data)
			.join(
				(enter) => enter.append('circle'),
				(update) => update.attr('class', 'updated'),
				(exit) => exit.remove()
			)
			.attr('r', (value) => value)
			.attr('cx', (value) => value * 2)
			.attr('cy', (value) => value * 2)
			.attr('stroke', '#fdfd00');

		// svg.selectAll('#my_dataviz')
		// 	.attr('width', width + margin.left + margin.right)
		// 	.attr('height', height + margin.top + margin.bottom)
		// 	.append('g')
		// 	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		// 	.data(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]); //useEffect only called when data changes

	return (
		<React.Fragment>
			<svg ref={svgRef}></svg>
			<br />
			<button onClick={() => setData(data.map((value) => value + 10))}>Update Data</button>
			{'\t'}
			<button onClick={() => setData(data.filter((value) => value <= 30))}>Filter Data</button>
		</React.Fragment>
	);
};

export default Heatmap;

/*****************************
 * As learned from the
 * `Using React (Hooks) with D3`
 * @ The Muratorium
 * https://www.youtube.com/watch?v=Y-ThTzB-Zjk
 *****************************/
