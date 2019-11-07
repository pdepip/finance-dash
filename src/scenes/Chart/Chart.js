import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles.scss';

import {
    Menu,
    TradingView
} from './components';

class Chart extends Component {
    render() {
        return (
            <div className='Scene-Container' id='chart-scene'>
                <div className='chart-menu'>
                    <Menu />
                </div>

                <div className='chart-section'>
                    <TradingView />
                </div>
            </div>
        )
    }

}

export default inject('assetData')(observer(Chart));
