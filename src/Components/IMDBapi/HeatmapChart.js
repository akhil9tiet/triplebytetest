/*****************************************************
 * Most of the code in here is with the help of self starter from vx charts
 * https://vx-demo.now.sh/static/docs/vx-heatmap.html
 ******************************************************/
import React, { useState, useRef, useEffect } from 'react';
import './HeatmapChart.css';
import { Grid } from '@material-ui/core';
import { Group } from '@vx/group';
import { scaleLinear } from '@vx/scale';
import { HeatmapRect } from '@vx/heatmap';
import { AxisLeft, AxisBottom } from '@vx/axis';

const HeatmapChart = ({ data }) => {
	const low1 = '#77312f';
	const high1 = '#31772f';

	const bg = '#fff';

	const max = (data, value = (d) => d) => Math.max(...data.map(value));
	const min = (data, value = (d) => d) => Math.min(...data.map(value));

	//accessors;
	const bins = (d) => d.bins;
	const count = (d) => d.count;

	const colorMax = max(data, (d) => max(bins(d), count));
	console.log('@@colormax', colorMax);
	const bucketSizeMax = max(data, (d) => bins(d).length);
	console.log('@@colormax', colorMax);
	// scales
	const xScale = scaleLinear({
		domain: [1, data.length],
	});

	const yScale = scaleLinear({
		domain: [1, bucketSizeMax],
	});

	const rectColorScale = scaleLinear({
		range: [low1, high1],
		domain: [7, 10],
	});

	let width = 500;
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
						binWidth={binWidth}
						binHeight={binWidth}
						gap={2}>
						{(heatmap) => {
							return heatmap.map((bins) => {
								return bins.map((bin) => {
									return (
										<rect
											key={`heatmap-rect-${bin.row}-${bin.column}`}
											className='vx-heatmap-rect'
											width={bin.width}
											height={bin.height}
											x={bin.x}
											y={bin.y}
											fill={bin.color}
											onClick={(event) => {
												const { row, column } = bin;
												alert(JSON.stringify({ row, column, ...bin.bin }));
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
						top={margin.top + 10}
						left={0 - 10 - margin.left - margin.right - separation}
						label={'Episodes'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
					/>

					<AxisBottom
						top={height}
						textAnchor={'middle'}
						gap={2}
						scale={xScale}
						left={0 - (margin.left + margin.right) / 2}
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
