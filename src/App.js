import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './styles/App.css';

import {
    Menu,
} from './components';

import {
    TodaysMarket,
    News,
    Assets,
    Futures,
    ComingSoon,
    Mobile,
    Chart,
} from './scenes';

class App extends Component {

  constructor(props) {
      super(props);

  }

  mobileDevice = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
  }

  renderContent = () => {
      switch (this.props.uiData.scene) {
          case 'todaysMarkets':
              return <TodaysMarket />
          case 'topNews':
              return <News />
          case 'assets':
              return <Assets />
          case 'futures':
              return <Futures />
          case 'portfolio':
              return <ComingSoon />
          case 'journal':
              return <ComingSoon />
          case 'spot':
              return <ComingSoon />
          case 'bitmex':
              return <ComingSoon />
          case 'chart':
              return <Chart />
          default:
              return <ComingSoon />
      }
      
  }

  render() {
    return (
      <div className="App">
        {
            (this.mobileDevice())
            ?
            <Mobile />
            :
            <div className='Base_Container'>

                
                <Menu />

                <div className='Content'>
                    { this.renderContent() }
                </div>
            </div>
        }
      </div>
    );
  }
}

export default inject('uiData')(observer(App));
