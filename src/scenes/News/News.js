import React, { Component } from 'react';
import { Provider, observer, inject } from 'mobx-react';

import { 
    NewsFeed,
} from './components';

import './styles.scss';

class News extends Component {

    render() {
        return (
            <div className='Scene-Container' id='news-scene'>
                <NewsFeed />
            </div>
        );
    }
}

export default inject('newsData')(observer(News));

