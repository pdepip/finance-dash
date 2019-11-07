import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import Trend from 'react-trend';

import { DollarValue } from '../../../../components';

import './styles.scss';

import StatsStore from './store';

class Stats extends Component {

    constructor(props) {
        super(props);
        this.store = new StatsStore(props);
    }

    render() {
        return(
            <div className='Component' id='market-stats'>
                <div className='Component-Title'>
                Market Stats
                </div>

            
                <div className='Component-Body' id='market-stats-container'>
                    <div className='market-stat'>
                        <div className='stat-body'>
                            <div className='stat-left'>
                                <div className='stat-title'>
                                Market Cap
                                </div>
                                <div className='stat-price'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      value={this.store.lastStatValue("marketCap")}
                                    />
                                </div>
                                <div className='stat-change'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      showArrow
                                      value={this.store.statChange('marketCap')}
                                      percentage
                                    />
                                </div>
                            </div>
                            <div className='stat-right'>
                                <div className='stat-chart'>
                                    <Trend
                                      data={toJS(this.store.statData('marketCap'))}
                                      strokeWidth={8}
                                      stroke={this.store.statTrend('marketCap')}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='market-stat'>
                        <div className='stat-body'>
                            <div className='stat-left'>
                                <div className='stat-title'>
                                Daily Volume
                                </div>
                                <div className='stat-price'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      value={this.store.lastStatValue('volume')}
                                    />
                                </div>
                                <div className='stat-change'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      showArrow
                                      value={this.store.statChange('volume')}
                                      percentage
                                    />
                                </div>
                            </div>
                            <div className='stat-right'>
                                <div className='stat-chart'>
                                    <Trend
                                      data={toJS(this.store.statData('volume'))}
                                      strokeWidth={8}
                                      stroke={this.store.statTrend('volume')}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='market-stat'>
                        <div className='stat-body'>

                            <div className='stat-left'>
                            <div className='stat-title'>
                            BTC Dom.
                            </div>

                                <div className='stat-price'>
                                    <DollarValue
                                      percentage
                                      signMatters
                                      prettyFormat
                                      value={this.store.lastStatValue('btcDominance')}
                                    />
                                </div>
                                <div className='stat-change'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      showArrow
                                      value={this.store.statChange('btcDominance')}
                                      percentage
                                    />
                                </div>
                            </div>
                            <div className='stat-right'>
                                <div className='stat-chart'>
                                    <Trend
                                      data={toJS(this.store.statData('btcDominance'))}
                                      strokeWidth={8}
                                      stroke={this.store.statTrend('btcDominance')}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='market-stat'>
                        <div className='stat-body'>
                            <div className='stat-left'>
                                <div className='stat-title'>
                                Top 100 Index
                                </div>
                                <div className='stat-price'>
                                    <DollarValue
                                      percentage
                                      signMatters
                                      prettyFormat
                                      value={this.store.lastStatValue("top100")}
                                    />
                                </div>
                                <div className='stat-change'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      showArrow
                                      value={this.store.statChange('top100')}
                                      percentage
                                    />
                                </div>
                            </div>
                            <div className='stat-right'>
                                <div className='stat-chart'>
                                    <Trend
                                      data={toJS(this.store.statData('top100'))}
                                      strokeWidth={8}
                                      stroke={this.store.statTrend('top100')}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='market-stat'>
                        <div className='stat-body'>
                            <div className='stat-left'>
                                <div className='stat-title'>
                                Altcoin Index
                                </div>
                                <div className='stat-price'>
                                    <DollarValue
                                      percentage
                                      signMatters
                                      prettyFormat
                                      value={this.store.lastStatValue('altRet')}
                                    />
                                </div>
                                <div className='stat-change'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      showArrow
                                      value={this.store.statChange('altRet')}
                                      percentage
                                    />
                                </div>
                            </div>
                            <div className='stat-right'>
                                <div className='stat-chart'>
                                    <Trend
                                      data={toJS(this.store.statData('altRet'))}
                                      strokeWidth={8}
                                      stroke={this.store.statTrend('altRet')}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='market-stat'>
                        <div className='stat-body'>

                            <div className='stat-left'>
                            <div className='stat-title'>
                            BTC Hashpower
                            </div>

                                <div className='stat-price'>
                                    <DollarValue
                                      noSign
                                      signMatters
                                      prettyFormat
                                      value={this.store.lastStatValue('hashrate')}
                                    />
                                </div>
                                <div className='stat-change'>
                                    <DollarValue
                                      signMatters
                                      prettyFormat
                                      showArrow
                                      value={this.store.statChange('hashrate')}
                                      percentage
                                    />
                                </div>
                            </div>
                            <div className='stat-right'>
                                <div className='stat-chart'>
                                    <Trend
                                      data={toJS(this.store.statData('hashrate'))}
                                      strokeWidth={8}
                                      stroke={this.store.statTrend('hashrate')}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>


                </div>


            </div>
        )
    }
}

export default inject('marketData')(observer(Stats));
