import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import classNames from 'classnames';

import { TVChartContainer } from '../../../../components';

import './styles.scss';

class Tradingview extends Component {

    constructor(props) {
        super(props);
        //this.store = new TradingviewStore(props);
    }

    componentWillUnmount() {
        //this.store.clean();
    }

    render() {
        return (
            <div className='component' id='tradingview'>

                <div className='component-container' id='tradingview-container'>
                    
                    <TVChartContainer 
                      symbol={"XBTUSD"}
                      bitmex={true}
                    />
                
                </div>
            </div>
                
        );
    }

}

export default Tradingview;
