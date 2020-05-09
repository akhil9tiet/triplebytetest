import React, { useState, useRef, useEffect } from 'react';
import './HeatmapChart.css';
import { Grid } from '@material-ui/core';
import { Group } from '@vx/group';
import { genBins } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { HeatmapRect } from '@vx/heatmap';
import { AxisLeft, AxisBottom } from '@vx/axis';

const HeatmapChart = () => {
	const hot1 = '#77312f';
	const hot2 = '#f33d15';
	const cool1 = '#122549';
	const cool2 = '#b4fbde';
	const bg = '#fff';

	// const svgRef = useRef();
	// const [data, setData] = useState([25, 30, 45, 60, 20, 75]);
	const data = genBins(6, 8);
	console.log(data);

	const max = (data, value = (d) => d) => Math.max(...data.map(value));
	const min = (data, value = (d) => d) => Math.min(...data.map(value));

	// accessors
	const bins = (d) => d.bins;
	const count = (d) => d.count;

	const colorMax = max(data, (d) => max(bins(d), count));
	const bucketSizeMax = max(data, (d) => bins(d).length);

	// scales
	const xScale = scaleLinear({
		domain: [0, data.length],
	});
	const yScale = scaleLinear({
		domain: [0, bucketSizeMax],
	});
	const circleColorScale = scaleLinear({
		range: [hot1, hot2],
		domain: [0, colorMax],
	});
	const rectColorScale = scaleLinear({
		range: [cool1, cool2],
		domain: [0, colorMax],
	});
	const opacityScale = scaleLinear({
		range: [0.1, 1],
		domain: [0, colorMax],
	});

	let width = 750;
	let height = 600;
	let separation = 4;
	let margin = { top: 60, left: 20, right: 20, bottom: 70 };

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

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]); //useEffect only called when data changes

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
											fillOpacity={bin.opacity}
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
						top={margin.top}
						left={0}
						label={'Seasons'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
					/>

					<AxisBottom
						top={height - margin.bottom}
						scale={xScale}
						left={0}
						label={'Episodes'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
					/>
				</Group>
			</svg>
		</React.Fragment>
	);
};

export default HeatmapChart;
