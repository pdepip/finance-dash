import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    ChartingLibraryWidgetOptions,
    widget,
    LanguageCode,
} from '../../charting_library/charting_library.min';

import './styles.scss';

class TVChartContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let url = 'https://demo_feed.tradingview.com';

        let interval = this.props.interval;
        if (this.props.bitmex) {
            interval = 30;
        } 

        this.dataFeed = new window.Datafeeds.UDFCompatibleDatafeed(url, interval * 1000)
/*
        const widgetOptions = {
            symbol: 'AAPL',
            datafeed: this.dataFeed,
            interval: 'D',
            container_id: this.props.containerId,
            library_path: this.props.libraryPath,
            locale: 'en',
            disabled_features: ['header_compare', 'header_symbol_search', 'header_interval_dialog_button'],
            enaled_features: ['study_templates'],
            custom_css_url: '../../../css/TVChartContainer.css',
            loading_screen: { backgroundColor: '#101010' },
            fullscreen: this.props.fullscreen,
            autosize: this.props.autosize,
            studies_overrides: this.props.studiesOverrides,
            overrides: {
                "mainSeriesProperties.candleStyle.upColor": "rgb(45, 255, 142)",
                "mainSeriesProperties.candleStyle.downColor": "rgb(243, 170, 66)",
                "mainSeriesProperties.candleStyle.drawBorder": false,
                "mainSeriesProperties.candleStyle.wickUpColor": "rgb(45, 255, 142)",
                "mainSeriesProperties.candleStyle.wickDownColor": "rgb(243, 170, 66)",
                "paneProperties.background": "#101010",
                "scalesProperties.backgroundColor": "#101010",
                "scalesProperties.textColor": "rgb(94, 115, 134)",
                "paneProperties.vertGridProperties.color": "#1c1c1c",
                "paneProperties.horzGridProperties.color": "#1c1c1c",
                "symbolWatermarkProperties.transparency": 90,
                "paneProperties.legendProperties.showSeriesTitle": false,
            }
        };
*/
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(url),
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: "/charting_library/",

			locale: 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
		};

        const tvWidget = new widget(widgetOptions);
        this.tvWidget = tvWidget;

    }

    componentWillUnmount() {
        this.dataFeed._dataPulseProvider.unsubscribe();
        window.dataFeed = null;
        window.tvWidget = null;
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        return (
            <div
              id={ this.props.containerId }
              className='TVChartContainer'
              style={{height: "100%"}}
            />
        );
    }
}

TVChartContainer.defaultProps = {
    symbol: 'ETH/BTC:binance',
    interval: 60,
    containerId: 'tv_chart_container',
    datafeedUrl: 'http://localhost:1337/udp',
    libraryPath: './lib/charting_library/',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {
        "volume.volume.color.1": "rgba(45, 255, 142, 0.4)",
        "volume.volume.color.0": "rgba(243,170, 66, 0.4)",
        "Overlay.barStyle.upColor": "rgb(45, 255, 142)",
        "Overlay.barStyle.downColor": "rgb(243, 170, 66)",
    },
}

export default TVChartContainer;
