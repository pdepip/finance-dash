import React from "react";
import PropTypes from "prop-types";

import { curveMonotoneX } from "d3-shape";
import { set } from "d3-collection";
import { timeFormat } from 'd3-time-format';
import { format } from "d3-format";
import { scaleOrdinal, schemeCategory10, scalePoint } from  "d3-scale";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	StackedBarSeries,
    AreaSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitDimensions } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils"; 
import { HoverTooltip } from 'react-stockcharts/lib/tooltip';

import { numberWithCommas } from '../../../../utils/utils';
class BuySellVolume extends React.Component {

    // Renders chart tooltip
    tooltipContent(ys) {
        const dateFormat = timeFormat("%Y-%m-%d %H:%m");

        return ({ currentItem, xAccessor }) => {
            return {
                x: dateFormat(this.props.data[xAccessor(currentItem)].date),
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
            xAccessor(data[0]),
        ];

        const f = (i) => {
            let colors = ['rgb(0, 184, 144)', 'rgb(214, 94, 88)'];
            return colors[i]
        }
		const fill = (d, i) => f(i);

        const canvasGradient = createVerticalLinearGradient([
            { stop: 0, color: "rgba(255, 141, 18, 0.1)" },
            { stop: 0.7, color:  "rgba(255, 141, 18, 0.3)" },
            { stop: 1, color: "rgba(255, 141, 18, 0.5)" },
        ]);


		return (
			<ChartCanvas ratio={ratio} width={width} height={height - 32 }
        			margin={{ left: 100, right: 100, top: 20, bottom: 30 }} type={type}
					seriesName="Fruits"
					xExtents={xExtents}
                    xScale={xScale}
					data={data}
					xAccessor={xAccessor}
					padding={1}>


				<Chart id={1}
						yExtents={[0, d => d.buyVolume + d.sellVolume]}>
					<XAxis axisAt="bottom" orient="bottom" 
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)" 
                        fontFamily="Roboto, sans-serif"
                        ticks={5}
                    />
					<YAxis axisAt="left" orient="left" 
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)" 
                        fontFamily="Roboto, sans-serif"
                        tickFormat={format(".2s")}
                    />
					<StackedBarSeries 
                      yAccessor={[d => d.buyVolume, d => d.sellVolume]}
					  fill={fill}
                    />

                    <HoverTooltip
                      tooltipContent={this.tooltipContent([
                          {
                              label: 'Buy Volume',
                              value: d => numberWithCommas(d.buyVolume),
                          },
                          {
                              label: 'Sell Volume',
                              value: d => numberWithCommas(d.sellVolume),
                          },
                          {
                              label: '24 Hour Volume',
                              value: d => numberWithCommas(d.volume24hr),
                          },
                      ])}
                      fontSize={15}
                    />
                    

				</Chart>

                <Chart
                  id={2}
                  yExtents={d => [d.volume24hr, d.volume24hr - (d.volume24hr * .03)]}
                >
					<YAxis axisAt="right" orient="right" 
                        stroke="rgba(0, 0, 0, 0.1)"
                        tickStroke="rgba(0, 0, 0, 0.7)" 
                        fontFamily="Roboto, sans-serif"
                        tickFormat={format(".2s")}
                    />

                    <AreaSeries
                      yAccessor={d => d.volume24hr}
                      fill="url(#Gradient2)"
                      strokeWidth={2}
                      stroke={"rgb(255, 141, 18)"}
                      interpolation={curveMonotoneX}
                      canvasGradient={canvasGradient}
                    />
                </Chart>


			</ChartCanvas>
		);
	}
}

BuySellVolume.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

BuySellVolume.defaultProps = {
	type: "hybrid",
};
BuySellVolume = fitDimensions(BuySellVolume);

export default BuySellVolume;
