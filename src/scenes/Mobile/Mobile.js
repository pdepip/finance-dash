import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles.scss';

import {
    Download,
} from '../../components';

class Mobile extends Component {
    render() {
        return (
            <div className='Mobile_Base'>
                <div className='Scene-Container' id='mobile-scene'>
                  <div className='mobile-container'>
                    <div className='mobile-title'>
                    Dcrypt mobile is currently under development.
                    <br/>
                    <br/>
                    Please use our desktop app for now!
                    </div>
                  </div>
                </div>
            </div>
        )
    }

}

export default inject('assetData')(observer(Mobile));
