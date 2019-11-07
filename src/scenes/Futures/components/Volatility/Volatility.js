import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { curveMonotoneX } from "d3-shape";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	ScatterSeries,
	SquareMarker,
	TriangleMarker,
	CircleMarker,
	LineSeries,
    AreaSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils"; 

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitDimensions } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { round } from '../../../../utils/utils'; 

class Volatility extends React.Component {

	tooltipContent(ys) {
		const dateFormat = timeFormat("%Y-%m-%d %H:%m");
		return ({ currentItem, xAccessor }) => {
			return {
				x: dateFormat(xAccessor(currentItem)),
				y: []
					.concat(
						ys.map(each => ({
							label: each.label,
							value: each.value(currentItem),
							stroke: each.stroke
						}))
					)
					.filter(line => line.value)
			};
		};
	}

	render() {
		const { data: initialData, type, width, height, ratio } = this.props;
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[0])
		];

        const canvasGradient = createVerticalLinearGradient([
                { stop: 0.5, color: hexToRGBA("#44b9ff", 0.1) },
                { stop: 0.7, color: hexToRGBA("#44b9ff", 0.3) },
                { stop: 1, color: hexToRGBA("#44b9ff", 0.5) },
        ]);

		return (
			<ChartCanvas ratio={ratio} width={width} height={height - 32}
					margin={{ left: 30, right: 70, top: 20, bottom: 30 }}
					type={type}
					pointsPerPxThreshold={1}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
					xScale={xScale}
					xExtents={xExtents}>
				<Chart id={1}
					yExtents={d => [d.volatility, d.volatility - (d.volatility * .2)]}>
					<XAxis axisAt="bottom" orient="bottom"
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)"
                        fontFamily="Roboto, sans-serif"
                    />
					<YAxis
						axisAt="right"
						orient="right"
						ticks={5}
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)"
                        fontFamily="Roboto, sans-serif"
                        percentScale={true} tickFormat={format(".0%")}
					/>

					<HoverTooltip
						tooltipContent={this.tooltipContent([
							{
								label: 'Volatility',
								value: d => d.volatility,
								//stroke: ema20.stroke()
							},
						])}
						fontSize={15}
					/>
                    
                <defs>
                    <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                        <stop offset="10%" stopColor="#fff" stopOpacity={0.1} />
                        <stop offset="70%" stopColor="#44b9ff" stopOpacity={0.1} />
                        <stop offset="100%"  stopColor="#44b9ff" stopOpacity={0.3} /> 
                    </linearGradient>
                </defs>

					<AreaSeries
			          yAccessor={d => round(d.volatility, 6)}
                      fill="url(#MyGradient)"
                      strokeWidth={2}
                      interpolation={curveMonotoneX}
                      canvasGradient={canvasGradient}
                    />

				</Chart>

				<CrossHairCursor />
			</ChartCanvas>

		);
	}
}

Volatility.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

Volatility.defaultProps = {
	type: "svg",
};
Volatility = fitDimensions(Volatility);

export default Volatility;
