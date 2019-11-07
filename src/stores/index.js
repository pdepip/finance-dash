import MarketData from './MarketData';
import UiData from './UiData';
import NewsData from './NewsData';
import AssetData from './AssetData';
import FuturesData from './FuturesData';
import ChartStore from './ChartStore';

const marketData = new MarketData();
const uiData     = new UiData();
const newsData   = new NewsData();
const assetData  = new AssetData();
const futuresData = new FuturesData();
const chartStore = new ChartStore();

(async() => {
    let hold = [
        await marketData.init(),
        await uiData.init(),
        await newsData.init(),
        await assetData.init(),
        await futuresData.init(),
    ]
})();

export default {
    marketData,
    uiData,
    newsData,
    assetData,
    futuresData,
    chartStore,
};
