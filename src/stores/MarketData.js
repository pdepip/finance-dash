import {
    decorate,
    observable,
    action,
    computed,
    autorun,
    toJS,
} from 'mobx';
import axios from 'axios';

class MarketData {

    loading = false;

    news = [];
    portfolio = [];
    assets = [];
    stats = [];

    constructor(root) {
        this.root = root;
    }

    init = async () => {

        let news = this.getNews();
        let stats = this.getStats();

        //let port = this.getPortfolio();
        //let assets = this.getAssets();

        let hold = [
            await news, 
            await stats,
            //await port, 
            //await assets,
        ];

    }

    getNews = async () => { 
    
        const method = '/news/top';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(data => this.news = data.data)
        .catch(err => {
            console.log('[ERROR] /news/top:', err);
            this.error = err;
        });
    }

    getStats = async() => {
        const method = '/market/stats/recent';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(data => this.stats = data.data)
        .catch(err => {
            console.log('[ERROR] /stats/recent', err);
            this.error = err;
        });
    }

    getPortfolio = async () => { }
    getAssets = async () => { }

    lastStatValue = (statName) => {
        if (this.stats.length > 0) {
            return this.stats[this.stats.length -1][statName]
        } else {
            return 0.0;
        }
    }

    statChange = (statName) => {
        if (this.stats.length > 1) {
            let n = this.stats[this.stats.length - 1][statName];
            let o = this.stats[this.stats.length - 2][statName];
            return ((n - o) / o * 100).toFixed(2);
        } else {
            return 0.0;
        }
    }

    statData = (statName) => {
        if (this.stats.length > 0) {
            return this.stats.map((stat) => {
                return stat[statName];
            });
        } else {
            return [];
        }

    }


}

export default decorate(MarketData, {
    loading: observable,
    news: observable,
    stats: observable,
    portfolio: observable,
    assets: observable,

    init: action.bound,
    getNews: action.bound,
    getStats: action.bound,
    getPortfolio: action.bound,
    getAssets: action.bound,
});
