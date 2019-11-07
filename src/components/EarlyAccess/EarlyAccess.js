import React, { Component } from 'react';

import './styles.scss';

class EarlyAccess extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='EarlyAccess'>

                <div 
                  className='button' 
                  id='download-button'
                  onClick={() => window.open('https://airtable.com/shru3subCXUMCX1yf', '_blank')}
                >
                Get Started
                </div>
            </div>
        );
    }
}

export default EarlyAccess;
