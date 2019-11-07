import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles.scss';

import {
    AssetTable,
} from './components';

class Assets extends Component {
    render() {
        return (
            <div className='Scene-Container' id='assets-scene'>
                <AssetTable />
            </div>
        )
    }

}

export default inject('assetData')(observer(Assets));
