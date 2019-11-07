import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './styles.scss';

class Portfolio extends Component {
    render() {
        return (
            <div className='Scene-Container' id='portfolio-scene'>
            </div>
        );
    }
}

export default inject('portfolioData')(observer(Portfolio));
