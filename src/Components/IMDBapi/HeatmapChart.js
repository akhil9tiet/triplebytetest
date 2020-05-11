import React, { useState, useRef, useEffect } from 'react';
import './HeatmapChart.css';
import { Grid } from '@material-ui/core';
import { Group } from '@vx/group';
import { genBins } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { HeatmapRect } from '@vx/heatmap';
import { AxisLeft, AxisBottom } from '@vx/axis';

const HeatmapChart = ({ seriesData, seasons, maxEpisodes }) => {
	const [state, setState] = useState({ seriesData, seasons, maxEpisodes });
	const hot1 = '#77312f';
	const hot2 = '#f33d15';
	const cool1 = '#3df315';
	const cool2 = '#31772f';
	const bg = '#fff';

	console.log('@@imdbdata:', state.seriesData);

	// accessors
	// const episodes = (d) => d.episodes;
	// const rating = (d) => d.rating;
	// const colorMax = max(data, (d) => max(episodes(d), rating));
	// const bucketSizeMax = max(data, (d) => episodes(d).length);

	var data = genBins(state.seasons, state.maxEpisodes);
	data = genBins(6, 10);
	console.log('##binsdata:', data);

	const max = (data, value = (d) => d) => Math.max(...data.map(value));
	const min = (data, value = (d) => d) => Math.min(...data.map(value));

	// accessors
	const bins = (d) => d.bins;
	const count = (d) => d.count;

	const colorMax = max(data, (d) => max(bins(d), count));
	const bucketSizeMax = max(data, (d) => bins(d).length);

	// scales
	const xScale = scaleLinear({
		domain: [1, data.length],
	});
	console.log(xScale);

	const yScale = scaleLinear({
		domain: [0, bucketSizeMax],
	});
	console.log(yScale);

	const rectColorScale = scaleLinear({
		range: [cool1, cool2],
		domain: [0, colorMax],
	});
	console.log(rectColorScale);

	const opacityScale = scaleLinear({
		range: [0.5, 1],
		domain: [0, colorMax],
	});
	console.log(opacityScale);

	let width = 540;
	let height = 500;
	let separation = 2;
	let margin = { top: 50, left: 20, right: 20, bottom: 50 };

	let size = width;
	if (size > margin.left + margin.right) {
		size = width - margin.left - margin.right - separation;
	}

	const xMax = size / 2;
	const yMax = height - margin.bottom - margin.top;

	const binWidth = xMax / data.length;
	const binHeight = yMax / bucketSizeMax;

	xScale.range([0, xMax]);
	yScale.range([yMax, 0]);

	// useEffect(() => {
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [data]); //useEffect only called when data changes

	return (
		<React.Fragment>
			<svg width={width} height={height}>
				<rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
				<Group top={margin.top} left={xMax + margin.left + separation}>
					<HeatmapRect
						data={data}
						xScale={xScale}
						yScale={yScale}
						colorScale={rectColorScale}
						opacityScale={opacityScale}
						binWidth={binWidth}
						binHeight={binWidth}
						gap={2}>
						{(heatmap) => {
							return heatmap.map((episodes) => {
								return episodes.map((bin) => {
									return (
										<rect
											key={`heatmap-rect-${bin.row}-${bin.column}`}
											className='vx-heatmap-rect'
											width={bin.width}
											height={bin.height}
											x={bin.x}
											y={bin.y}
											fill={bin.color}
											fillOpacity={bin.opacity}
											onClick={(event) => {
												const { row, column } = bin;
												alert(
													JSON.stringify({
														row,
														column,
														...bin.bin,
													})
												);
											}}
										/>
									);
								});
							});
						}}
					</HeatmapRect>
					<AxisLeft
						scale={yScale}
						textAnchor={'middle'}
						top={margin.top}
						left={0}
						label={'Episodes'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
					/>

					<AxisBottom
						top={height - margin.bottom}
						textAnchor={'middle'}
						gap={1}
						scale={xScale}
						left={0}
						label={'Seasons'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
					/>
				</Group>
			</svg>
		</React.Fragment>
	);
};

export default HeatmapChart;
