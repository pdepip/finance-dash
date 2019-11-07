import React, { Component } from 'react';
import Trend from 'react-trend';
import { DollarValue } from '../';

import './styles.scss';

class AssetCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='asset-card'>
                <div className='card-body'>
                    <div className='card-left'>
                        <div className='card-title'>
                        {this.props.title}
                        </div>

                        <div className='card-price'>
                            <DollarValue
                              signMatters
                              prettyFormat
                              value={this.props.price}
                            />
                        </div>

                        <div className='card-change'>
                            <DollarValue
                              signMatters
                              prettyFormat
                              showArrow
                              percentage
                              value={this.props.change}
                            />
                        </div>
                    </div>
                    <div className='card-right'>
                        <div className='card-chart'>
                            <Trend
                              data={this.props.data}
                              strokeWidth={8}
                              stroke={this.props.stroke}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetCard;
