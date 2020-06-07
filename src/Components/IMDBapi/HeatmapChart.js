/*****************************************************
Code: akhil9tiet 
https://github.com/hshoff/vx/issues/735

Heatmap tooltip issue (https://github.com/hshoff/vx/issues/735#event-3397662822) solved by @iguacel (Jose A. Álvarez). Also, thanks for chaning styling on the code.

* Most of the code in here is with the help of self starter from vx charts
 * https://vx-demo.now.sh/static/docs/vx-heatmap.html
 ******************************************************/
import React from 'react';
import { Group } from '@vx/group';
import { localPoint } from '@vx/event';
import { useTooltip, TooltipWithBounds } from '@vx/tooltip';
import { scaleLinear } from '@vx/scale';
import { HeatmapRect } from '@vx/heatmap';
import { AxisLeft, AxisBottom } from '@vx/axis';
import TooltipCard from './TooltipCard';

import './HeatmapChart.css';

const HeatmapChart = ({ data }) => {
	// const activeTile = useRef(null);

	const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip();

	// https://colorbrewer2.org/#type=sequential&scheme=OrRd&n=9
	const low1 = '#fee8c8';
	const high1 = '#b30000';

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

	return (
		<React.Fragment>
			<div
				style={{
					position: 'relative',
					height: '100%',
					width: '100%',
					overflowX: 'fixed',
				}}>
				<svg
					className='heatmap'
					style={{
						background: '#fff',
						overflow: 'visible',
						marginBottom: '2rem',
						display: 'block',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					width={width}
					height={height}>
					{/* <rect
						key={`heatmap-rect-${binWidth}-${binHeight}`}
						x={margin.left}
						y={0}
						width={width}
						height={height + margin.top + margin.bottom}
						rx={14}
						fill={bg}
					/> */}
					<Group top={0} left={150 + margin.left / 2}>
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
									return bins.map((bin, i) => {
										return (
											<Group key={`heatmap-rect-${bin.row}-${bin.column}`}>
												<rect
													style={{
														cursor: 'pointer',
													}}
													rx={8}
													key={`heatmap-rect-${bin.row}-${bin.column}`}
													className='vx-heatmap-rect'
													width={bin.width}
													height={bin.height}
													x={bin.x}
													y={bin.y}
													fill={bin.color}
													onMouseOver={(event) => {
														if (tooltipTimeout) {
															clearTimeout(tooltipTimeout);
														}
														const coords = localPoint(event.target.ownerSVGElement, event);
														return showTooltip({
															tooltipLeft: coords.x,
															tooltipTop: coords.y,
															tooltipData: bin,
														});
													}}
													onMouseLeave={(event) => {
														tooltipTimeout = setTimeout(() => {
															hideTooltip();
														}, 300);
													}}>
													<animate
														attributeName='height'
														from={0}
														to={binWidth}
														dur='0.5s'
														fill='cubic-bezier(0.165, 0.84, 0.44, 1)'
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
				{tooltipOpen && tooltipData && (
					<TooltipWithBounds
						key={Math.random()}
						className='tool-tip'
						// top={tooltipTop - 450}
						// left={tooltipLeft - 450}
						top={tooltipTop}
						left={tooltipLeft}
						style={{
							position: 'absolute',
							backgroundColor: '#fff',
							borderRadius: '3px',
							boxShadow: '0px 0px 5px #e0e5ec',
							margin: '15px',
							minHeight: '50px',
							border: '1px solid #fff',
							fontFamily: 'Arial, sans-serif',
							padding: '0 1em 1em 1em',
						}}>
						<TooltipCard episodeid={tooltipData?.bin?.imdbid} />
						{/* <p>{tooltipData?.bin?.imdbid}</p> */}
						{/* <h2>{tooltipData?.bin?.imdburl}</h2> */}
						{/* <p>{tooltipData?.bin?.release}</p> */}

						{/* <br /> */}
						{/* <strong>{tooltipData?.count}</strong> */}
					</TooltipWithBounds>
				)}
			</div>
		</React.Fragment>
	);
};
// render(<HeatmapChart />, document.getElementById('root'));
export default HeatmapChart;
