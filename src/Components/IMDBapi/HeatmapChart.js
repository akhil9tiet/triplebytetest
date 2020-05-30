/*****************************************************
 * Most of the code in here is with the help of self starter from vx charts
 * https://vx-demo.now.sh/static/docs/vx-heatmap.html
 ******************************************************/
import React, { useRef } from 'react';
import './HeatmapChart.css';
// import { Grid } from '@material-ui/core';
import { Group } from '@vx/group';
import { localPoint } from '@vx/event';
import { useTooltip, TooltipWithBounds } from '@vx/tooltip';
import { scaleLinear } from '@vx/scale';
import { HeatmapRect } from '@vx/heatmap';
import { AxisLeft, AxisBottom } from '@vx/axis';
// import { schemePaired, scaleOrdinal } from 'd3';

const HeatmapChart = ({ data }) => {
	const activeTile = useRef(null);
	const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip();

	// var tooltipData, tooltipLeft, tooltipTop, tooltipOpen, hideTooltip;
	const low1 = '#a2202d';
	const high1 = '#1f2091';

	// const bg = "#e0e5ed";
	const bg = '#fff';

	const max = (data, value = (d) => d) => Math.max(...data.map(value));
	const min = (data, value = (d) => d) => Math.min(...data.map(value));

	//accessors;
	const bins = (d) => d.bins;
	const count = (d) => d.count;

	const colorMax = max(data, (d) => max(bins(d), count));
	const colorMin = min(data, (d) => min(bins(d), count));
	// console.log('@@colormax', colorMax);
	// console.log('@@colormin', colorMin);

	const bucketSizeMax = max(data, (d) => bins(d).length);
	// console.log('@@max episodes', bucketSizeMax);
	const seasons = data.length;
	// console.log('@@seasons', seasons);
	let tooltipTimeout;
	// scales
	const xScale = scaleLinear({
		domain: [1, data.length],
	});

	const yScale = scaleLinear({
		domain: [1, bucketSizeMax],
		nice: true,
	});

	const rectColorScale = scaleLinear({
		range: [low1, high1],
		domain: [colorMin, colorMax],
	});

	let width = seasons * 90;
	let height = bucketSizeMax * 55;
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

	xScale.range([1, xMax]);
	yScale.range([yMax, 1]);

	// const handleMouseOverTile = ({ event, bin }) => {
	// 	const coords = localPoint(event.target.ownerSVGElement, event);
	// 	console.log(
	// 		'$$$$',
	// 		showTooltip({
	// 			tooltipLeft: coords.x,
	// 			tooltipTop: coords.y,
	// 			tooltipData: bin.title,
	// 		})
	// 	);
	// 	withTooltip.showTooltip({
	// 		tooltipLeft: coords.x,
	// 		tooltipTop: coords.y,
	// 		tooltipData: bin.title,
	// 	});
	// };

	return (
		<React.Fragment>
			<svg width={width} height={height}>
				<rect
					key={`heatmap-rect-${binWidth}-${binHeight}`}
					x={margin.left}
					y={0}
					width={width}
					height={height + margin.top + margin.bottom}
					rx={14}
					fill={bg}
				/>
				<Group top={0} left={xMax + margin.left / 2}>
					<HeatmapRect
						data={data}
						xScale={xScale}
						yScale={yScale}
						radius={50}
						colorScale={rectColorScale}
						binWidth={binWidth}
						binHeight={binWidth}
						gap={2}>
						{(heatmap) => {
							return heatmap.map((bins) => {
								return bins.map((bin) => {
									return (
										<Group key={`heatmap-rect-${bin.row}-${bin.column}`}>
											<rect
												ref={activeTile}
												rx={8}
												key={`heatmap-rect-${bin.row}-${bin.column}`}
												className='vx-heatmap-rect'
												width={bin.width}
												height={bin.height}
												x={bin.x}
												y={bin.y}
												fill={bin.color}
												// onClick={(event) => {
												// 	const { row, column } = bin;
												// 	activeTile.current.setAttribute('active', true);
												// 	console.log('ref', activeTile.current);
												// 	handleMouseOverTile(event, bin);
												// 	// alert(JSON.stringify({ row, column, ...bin.bin }));
												// }}
												//
												// onMouseMove={(event) => handleMouseOverTile(event, bin)}
												// onMouseOut={() => hideTooltip}

												onMouseLeave={(event) => {
													tooltipTimeout = setTimeout(() => {
														hideTooltip();
													}, 300);
												}}
												onClick={(event) => {
													console.log(bin.bin.title);
													if (tooltipTimeout) {
														clearTimeout(tooltipTimeout);
													}
													// const top = bin.y + 10;
													// const offset = binWidth / 2;
													// const left = bin.x + offset;
													const coords = localPoint(event.target.ownerSVGElement, event);
													showTooltip({
														tooltipLeft: coords.x + 500,
														tooltipTop: coords.y + 500,
														tooltipData: bin.bin.title,
														// tooltipLeft: left,
														// tooltipTop: top,
													});
												}}>
												{' '}
												<animate
													attributeName='height'
													from={0}
													to={binWidth}
													dur='0.5s'
													fill='freeze'
												/>
											</rect>
											<text
												dy={'.33em'}
												x={bin.x + bin.width / 2}
												y={bin.y + bin.height / 2}
												fontSize={14}
												fontFamily='Arial'
												textAnchor={'middle'}
												fill={'#fff'}
												style={{ pointerEvents: 'none' }}>
												{bin.count}
											</text>
										</Group>
									);
								});
							});
						}}
					</HeatmapRect>
					<AxisLeft
						scale={yScale}
						textAnchor={'middle'}
						hideAxisLine={true}
						numTicks={bucketSizeMax}
						top={margin.top + bucketSizeMax}
						left={0 - 20 - margin.left - margin.right - separation}
						label={'Episodes'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
						fontSize={24}
					/>

					<AxisBottom
						// top={height}
						top={yMax + margin.top + margin.bottom - separation * bucketSizeMax + 20}
						// top={yMax + 200}
						textAnchor={'middle'}
						hideAxisLine={true}
						numTicks={data.length}
						scale={xScale}
						left={0 - (margin.left + margin.right) / 2 - separation}
						label={'Seasons'}
						stroke={'#1b1a1e'}
						tickTextFill={'#1b1a1e'}
						fontSize={24}
					/>
				</Group>
			</svg>
			{tooltipOpen && (
				<TooltipWithBounds
					// set this to random so it correctly updates with parent bounds
					key={Math.random()}
					top={tooltipTop}
					left={tooltipLeft}>
					Data value <strong>{tooltipData}</strong>
					<br />
					<img height={100} width={100} src='https://i.redd.it/5wctk6ivvk021.jpg' />
				</TooltipWithBounds>
			)}
		</React.Fragment>
	);
};

export default HeatmapChart;
