import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import './styles.scss';

class News extends Component {


    openArticle = (url) => {
        window.open(url, '_blank');
    }

    renderStory = ({title, image, createdAt, id, url}) => {
        return (
            <div
              key={id}
              onClick={() => this.openArticle(url)}
              className='story'
            >
                <div className='story-container'>
                    <div className='story-image'>
                        <img className='item-image' src={image} />
                    </div>
                    
                    <div className='story-body'>
                       <div className='story-title'>{title}</div>


                      <div className='story-footer'>
                        <div className='story-time'>
                        {moment(createdAt * 1000).fromNow()}
                        </div>
                    </div>
                    </div>

                
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='Component' id='market-news'>

                <div className='Component-Title'>
                Market News
                </div>
                
                <div className='Component-Body' id='market-news-container'>

                    { /* this.props.marketData.news.slice(0, 10).map((story) => this.renderStory(story)) */}
                    {this.props.newsData.articles.slice(0, 50).map((story) => this.renderStory(story))}

                </div>
            </div>
        );
    }
}

export default inject('marketData', 'newsData')(observer(News));

