import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';

import './styles.css';

class Menu extends Component {

    render() {
        return (
            <div className='Menu'>
                <div className='Menu-Container'>
                    <div className='Menu-Header'>
                        <div className='Menu-Logo'></div>
                    </div>

                    <div className='Menu-Content'>
                        <div className='Menu-Section'>
                            <div className='Menu-Section-Title'>
                            Market Analysis
                            </div>
                            <div className='Menu-Section-Body'>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'todaysMarkets',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('todaysMarkets')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Today's Markets</div>
                                    </div>
                                </div>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'topNews',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('topNews')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Top News</div>
                                    </div>
                                </div>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'assets',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('assets')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Assets</div>
                                    </div>
                                </div>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'futures',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('futures')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Futures</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Menu-Section'>
                            <div className='Menu-Section-Title'>
                            Management
                            </div>
                            <div className='Menu-Section-Body'>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'portfolio',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('portfolio')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Portfolio Management</div>
                                    </div>
                                </div>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'journal',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('journal')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Trade Journal</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Menu-Section'>
                            <div className='Menu-Section-Title'>
                            Execution
                            </div>
                            <div className='Menu-Section-Body'>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'spot',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('spot')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Spot Trading</div>
                                    </div>
                                </div>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'bitmex',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('bitmex')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Bitmex Trading</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='Menu-Section'>
                            <div className='Menu-Section-Title'>
                            Tools
                            </div>
                            <div className='Menu-Section-Body'>
                                <div 
                                  className={classNames('Menu-Section-Item', {
                                      'active': this.props.uiData.scene === 'chart',
                                  })}
                                  onClick={() => this.props.uiData.changeScene('chart')}
                                >
                                    <div className='Menu-Item-Title'>
                                        <div className='Menu-Item-Title-Text'>Chart</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default inject('uiData')(observer(Menu));
