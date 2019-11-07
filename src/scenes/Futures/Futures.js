import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import './styles.scss';

import {
    Menu,
    VolumeProfile,
    BuySellVolume,
    OpenInterest,
    Volatility,
} from './components';

class Futures extends Component {
    render() {
        return (
            <div className='Scene-Container' id='futures-scene'>

                <div className='futures-menu'>
                    <Menu />
                </div>

                <div className='chart-section'>
                    <div className='chart-box' id='volume-profile'>
                        <div className='box-header'>
                        Price
                        </div>

                        <VolumeProfile 
                          data={toJS(this.props.futuresData.ohlcv)}
                        />
                    </div>
            
                    <div className='chart-box' id='buysell-volume'>
                        <div className='box-header'>
                        Buy Sell Volume
                        </div>

                        <BuySellVolume 
                          data={toJS(this.props.futuresData.buySellVolume)}
                        />
                    </div>
                    <div className='chart-box' id='volatility'>
                        <div className='box-header'>
                        Volatility
                        </div>

                        <Volatility 
                          data={toJS(this.props.futuresData.volatility)}
                        />
                    </div>
                    <div className='chart-box' id='open-interest'>
                        <div className='box-header'>
                        Open Interest
                        </div>

                        <OpenInterest 
                          data={toJS(this.props.futuresData.openInterest)}
                        />
                    </div>
                </div>
                

            </div>
        )
    }

}

export default inject('futuresData')(observer(Futures));
