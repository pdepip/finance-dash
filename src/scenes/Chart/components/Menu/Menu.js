import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import Select from 'react-select';

import './styles.scss';

class Menu extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='chart-menu-container'>
            
                <div className='menu-section'>

                    <div id='dropdown-container'>
                        <Select
                          className='asset-select'
                          onChange={this.props.chartStore.handleSourceChange}
                          isSearchable={true}
                          isClearable={false}
                          isDisabled={false}
                          options={toJS(this.props.chartStore.sourceOptions)}
                          value={this.props.chartStore.sourceOption}
                          name='asset-select'
                          placeholder='Select a Data Source'
                        />
                    </div>

                    <div id='dropdown-container'>
                        <Select
                          className='asset-select'
                          onChange={this.props.chartStore.handleDataChange}
                          isSearchable={true}
                          isClearable={false}
                          isDisabled={false}
                          options={toJS(this.props.chartStore.dataOptions)}
                          value={this.props.chartStore.dataOption}
                          name='asset-select'
                          placeholder='Select Data to Chart'
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default inject('chartStore')(observer(Menu));
