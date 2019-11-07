import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import ReactTable from 'react-table';

import { DollarValue } from '../../../../components';
import { round } from '../../../../utils/utils';
import './styles.scss';

class AssetTable extends Component {

    columns = [
        {
            Header: 'Name',
            accessor: 'name',
            className: 'asset-info',
            Cell: ({ original: asset }) => {
                return (
                    <div className='asset-info'>
                        <div className='asset-icon'>
                          <img src={asset.icon} height={20} />
                        </div>
                        <div className='asset-name'>
                            { asset.name }
                        </div>

                    </div>
                )
            },
        },
        {
            Header: 'Last Price',
            accessor: 'priceUsd',
            Cell: ({ original: asset }) => {

                let number;
                if (asset.priceUsd < .01) {
                    number = round(asset.priceUsd, 4)
                } else {
                    number = round(asset.priceUsd, 2);
                }

                return (
                    <DollarValue
                    value={number}
                    />
                )
            },
        },
        {
            Header: '% Change',
            accessor: 'percentageChange24HrUsd',
            Cell: ({ original: asset }) => {
                return (
                    <DollarValue
                      percentage
                      signMatters
                      showArrow
                      value={asset.percentageChange24HrUsd}
                    />
                );
            },
        },
        {
            Header: 'Volume',
            accessor: 'vol24HrUsd',
            Cell: ({ original: asset }) => {
                return (
                    <DollarValue
                      value={Math.trunc(asset.vol24HrUsd)}
                    />
                );
            },
        },
        {
            Header: 'Market Cap',
            accessor: 'marketCap',
            Cell: ({ original: asset }) => {
                return (
                    <DollarValue
                      value={asset.marketCap}
                    />
                );
            },
        },
        {
            Header: '7D',
            accessor: 'percentageChange7Usd',
            Cell: ({ original: asset }) => {
                return (
                    <DollarValue
                      percentage
                      signMatters
                      showArrow
                      value={asset.percentageChange7dUsd}
                    />
                );
            },
        },
        {
            Header: '1M',
            accessor: 'percentageChange30dUsd',
            Cell: ({ original: asset }) => {
                return (
                    <DollarValue
                      percentage
                      signMatters
                      showArrow
                      value={asset.percentageChange30dUsd}
                    />
                );
            },
        },
        {
            Header: 'YTD',
            accessor: 'percentageChangeYtdUsd',
            Cell: ({ original: asset }) => {
                return (
                    <DollarValue
                      percentage
                      signMatters
                      showArrow
                      value={asset.percentageChangeYtdUsd}
                    />
                );
            },
        },

    ];

    render() {
        return (
            <div className='Component' id='asset-table'>
                <div className='Component-Title'>
                    Assets
                </div>

                <div className='Component-Body' id='asset-table-container'>
                    <ReactTable
                        className='dcrypt-table'
                        data={ toJS(this.props.assetData.assets) }
                        columns={ this.columns }
                        noDataText={ "No Asset Data" }
                        defaultPageSize={50}
                        minRows={50} 
                        showPaginationBottom={true}
                        defaultSorted={
                            [{
                                id: 'marketCap',
                                desc: true,
                            }]
                        }
                    />

                </div>
                
            </div>
        );
    }
}

export default inject('assetData')(observer(AssetTable));
