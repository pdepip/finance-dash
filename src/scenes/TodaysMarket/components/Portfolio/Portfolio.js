import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import Trend from 'react-trend';

import { 
    DollarValue,
    AssetCard,
    EarlyAccess,
} from '../../../../components';

import './styles.scss';

import PortfolioStore from './store';

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.store = new PortfolioStore(props);
    }

    render() {
        return(
            <div className='Component' id='portfolio-overview'>
                <div className='Component-Title'>
                Portfolio
                </div>

                <EarlyAccess />
            
                <div className='Component-Body' id='portfolio-container'>

                    <div id='portfolio-total'>
                        <DollarValue
                          value={38247}
                        />
                    </div>

                    <div id='portfolio-change'>
                        <DollarValue
                          showArrow
                          signMatters
                          prettyFormat
                          value={163.44}
                        />
                        <DollarValue
                          parenthesis
                          signMatters
                          percentage
                          value={"14.7"}
                          style={{
                              paddingLeft: "6px"
                          }}
                        />
                        <div id='portfolio-time'>
                        7 days
                        </div>
                
                    </div>
                    <div className='portfolio-bottom'>

                    <div id='portfolio-value'>
                        <Trend
                          data={toJS(this.store.portfolioData)}
                          strokeWidth={1.5}
                          stroke={this.store.strokeColor}
                            smooth
                            autoDraw
                            autoDrawDuration={3000}
                            autoDrawEasing="ease-out"
                        />
                    </div>


                    <div id='portfolio-movers'>

                        <div className='movers-title'>
                        Top Movers
                        </div>

                        <div className='mover-cards'>

                            <AssetCard
                              title={"Nano"}
                              price={-0.86}
                              change={-2.34}
                              data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0]}
                              stroke={"#f45531"}
                            />

                            <AssetCard
                              title={"OmiseGo"}
                              price={1.26}
                              change={1.73}
                              data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,10]}
                              stroke={"#21ce99"}
                            />

                            <AssetCard
                              title={"0x"}
                              price={0.29}
                              change={0.63}
                              data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,10]}
                              stroke={"#21ce99"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}

export default inject('marketData')(observer(Portfolio));
