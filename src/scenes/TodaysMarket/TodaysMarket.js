import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';

import {
    News,
    Stats,
    Portfolio,
} from './components';

import './styles.css';

class TodaysMarket extends Component {
    render() {
        return (
            <div className='Scene-Container' id='todays-markets'>

                    <div className='column-left'>

                        <div className='top-left'>
                            <div className='Scene-Component'>

                                <Stats />
                            </div>
                        </div>

                        <div className='bottom-left'>
                          <div className='Scene-Component'>
                            <Portfolio />
                          </div>
                        </div>

                    </div>

                    <div className='column-right'>
                        <div className='Scene-Component'>
                            <News />
                        </div>
                    </div>
                    
            { /*
                    <div className='Scene-Component' id='top-row'>
                        <News />
                    </div>

                    <div className='Scene-Component' id='bottom-row'>

                        <div className='Scene-Component' id='bottom-left'>

                            <Stats />
                        </div>

                        <div className='Scene-Component' id='bottom-right'>

                            <Portfolio />
                        </div>

                    </div>
                    */ }
            </div>
        )
    }
}

export default inject('marketData', 'newsData')(observer(TodaysMarket));
