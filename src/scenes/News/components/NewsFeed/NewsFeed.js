import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import ReactTable from 'react-table';
import classNames from 'classnames';

import './styles.scss';

class NewsFeed extends Component {

    constructor(props) {
        super(props);
    }

    parseTime = (time) => {
        let t = new Date(time * 1000);

        const options = {
            hour: '2-digit',
            minute: '2-digit',
        };

        return t.toLocaleTimeString('en-us', options);
    }
        

    openArticle = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    }

    columns = [
        {
            Header: 'Headline',
            accessor: 'title',
            className: 'news-title',
            Cell: ({ original: article }) => {
                return (
                    <div className='news-title'>
                        <span 
                          className={classNames('title-text', {
                              'disabled': article.url === '',
                          })}
                          onClick={() => this.openArticle(article.url)}>
                            { article.title }
                        </span>
                        <span className='title-author'>
                            { article.author}
                        </span>
                    </div>
                )
            },
        },
        {
            Header: 'Topics',
            accessor: 'topics',
            Cell: ({ original: article }) => {
                let topicStr, firstEnt, numEnt, extraEnt;
                if (article.entities) {
                    firstEnt = article.entities[0].entity;
                    numEnt = article.entities.length - 1;

                    if (numEnt > 0) {
                        extraEnt = '+' + numEnt;
                    }
                }

                return (
                    <div className='entity-item'>
                        <span className='entity-first'>{firstEnt}</span>
                        <span classNkame='entity-extra'>{extraEnt}</span>
                    </div>
                );
            },
            width: 125,
        },
        /*
        {
            Header: 'Source',
            accessor: 'author',
            Cell: ({ original: article }) => {
                return ( <div> { article.author } </div> );
            },
        },
        */
        {
            Header: 'Time',
            accessor: 'time',
            Cell: ({ original:article }) => {
                let t = this.parseTime(article.createdAt).split(' ');
                return (
                    <div>
                    {`${t[0]} ${t[1].toLowerCase()}`}
                    </div>
                )
            },
            width: 100,
            className: 'news-time',
        }
    ]
    
    render() {
        return (
            <div className='Component' id='news-feed'>
                <div className='Component-Title'>
                Top Stories
                </div>

                <div className='Component-Body' id='trending-news-container'>

                    <ReactTable
                      className='dcrypt-table'
                      data={ toJS(this.props.newsData.articles) }
                      columns={ this.columns }
                      noDataText={ "No Trending Stories" }
                      defaultPageSize={500}
                      minRows={ toJS(this.props.newsData.articles).length }
                      showPaginationBottom={false}
                    />

                </div>
            </div>
        );
    }

} 
export default inject('newsData')(observer(NewsFeed));
