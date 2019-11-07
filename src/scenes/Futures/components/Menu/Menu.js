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
        console.log(toJS(this.props.futuresData.instruments));
        return (
            <div className='analytics-menu-container'>
            
                <div className='menu-section'>

                    <div id='dropdown-container'>
                        <Select
                          className='asset-select'
                          onChange={this.props.futuresData.changeInstrument}
                          isSearchable={true}
                          isClearable={false}
                          isDisabled={false}
                          options={toJS(this.props.futuresData.instruments)}
                          value={this.props.futuresData.instrument}
                          name='asset-select'
                          placeholder='Search for a contract...'
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default inject('futuresData')(observer(Menu));
