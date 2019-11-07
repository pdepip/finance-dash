import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	VolumeProfileSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
	EdgeIndicator,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { change } from "react-stockcharts/lib/indicator";
import { fitDimensions } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class VolumeProfile extends React.Component {
	render() {

		const changeCalculator = change();

		const { type, data: initialData, width, height, ratio } = this.props;

		const calculatedData = changeCalculator(initialData);
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={height - 32}
				width={width}
				ratio={ratio}
				margin={{ left: 30, right: 80, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>

				<Chart id={2}
					yExtents={[d => d.volume]}
					height={150} origin={(w, h) => [0, h - 150]}
				>
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume}
						widthRatio={0.95}
						opacity={0.2}
						fill={d => d.close > d.open ? "rgba(0, 184, 144, 0.2)" : "rgba(214, 94, 88, 0.2)"}
					/>
				</Chart>
				<Chart id={1}
					yExtents={[d => [d.high, d.low]]}
					padding={{ top: 40, bottom: 20 }}
				>
					<XAxis axisAt="bottom" orient="bottom"
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)"
                        fontFamily="Roboto, sans-serif"
                    />
					<YAxis axisAt="right" orient="right" 
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)"
                        ticks={5}
                        fontFamily="Roboto, sans-serif"
                    />
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<VolumeProfileSeries 
                      bySession orient="right" showSessionBackground
                      sessionStart={({ d, i, plotData }) => i > 0 && plotData[i - 1].date.getDay() !== d.date.getDay()}
                      fill={({ type }) =>  type === "up" ? "rgb(0, 184, 144)" : "rgb(214, 94, 88)"}
                      stroke={({ type }) =>  type === "up" ? "rgb(0, 184, 144)" : "rgb(214, 94, 88)"}
                      opacity={0.8}
                    />
					<CandlestickSeries 
                      wickStroke={d => d.close > d.open ? "rgb(0, 184, 144)" : "rgb(214, 94, 88)"}
                      stroke={d => d.close > d.open ? "rgb(0, 184, 144)" : "rgb(214, 94, 88)"}
                    />
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "rgb(0, 184, 144)" : "rgb(214, 94, 88)"}/>

				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

VolumeProfile.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

VolumeProfile.defaultProps = {
	type: "hybrid",
};
VolumeProfile = fitDimensions(VolumeProfile);

export default VolumeProfile;
