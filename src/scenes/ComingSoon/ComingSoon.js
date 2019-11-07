import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles.scss';

import {
    EarlyAccess,
} from '../../components';

class ComingSoon extends Component {
    render() {
        return (
            <div className='Scene-Container' id='coming-soon-scene'>
                <EarlyAccess />
            </div>
        )
    }

}

export default inject('assetData')(observer(ComingSoon));
