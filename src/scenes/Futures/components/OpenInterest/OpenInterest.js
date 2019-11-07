import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { curveMonotoneX } from "d3-shape";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	ScatterSeries,
	SquareMarker,
	TriangleMarker,
	CircleMarker,
	LineSeries,
    AreaSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth, fitDimensions} from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { numberWithCommas } from '../../../../utils/utils'; 

class OpenInterest extends React.Component {

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
		const { data: initialData, type, width, ratio, height } = this.props;
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
                { stop: 0, color: hexToRGBA("#44b9ff", 0.1) },
                { stop: 0.7, color: hexToRGBA("#44b9ff", 0.3) },
                { stop: 1, color: hexToRGBA("#44b9ff", 0.5) },
        ]);

		return (
			<ChartCanvas ratio={ratio} width={width} height={height - 32}
					margin={{ left: 30, right: 100, top: 20, bottom: 30 }}
					type={type}
					pointsPerPxThreshold={1}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
					xScale={xScale}
					xExtents={xExtents}>
				<Chart id={1}
						yExtents={d => [d.openInterest, d.openInterest - (d.openInterest * .01) ]}>

					<XAxis axisAt="bottom" orient="bottom"
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)"
                        fontFamily="Roboto, sans-serif"
                    />
					<YAxis
						axisAt="right"
						orient="right"
						// tickInterval={5}
						// tickValues={[40, 60]}
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)"
						ticks={5}
                        fontFamily="Roboto, sans-serif"
					/>

					<HoverTooltip
						tooltipContent={this.tooltipContent([
							{
								label: 'Open Interest',
								value: d => numberWithCommas(d.openInterest),
								//stroke: ema20.stroke()
							},
						])}
						fontSize={15}
					/>

                    <AreaSeries
                        yAccessor={d => d.openInterest}
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

OpenInterest.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

OpenInterest.defaultProps = {
	type: "svg",
};

export default fitDimensions(OpenInterest);
