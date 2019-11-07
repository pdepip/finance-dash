import {
    decorate,
    observable,
    action,
    computed,
    autorun,
    toJS,
} from 'mobx'
import axios from 'axios';
import { isoParse } from 'd3-time-format';

class FuturesData {

    loading = false;
    error = undefined;

    instrument = { value: 'XBTUSD', label: 'XBTUSD' };
    instruments = [];

    volatility = [];
    buySellVolume = [];
    openInterest = [];
    ohlcv = [];

    constructor(root) {
        this.root = root;

        this.disposer = autorun(() => {
            if (this.instrument) {
                this.init();
            }
        });
    }

    init = async () => {

        this.loading = true;

        let vol = this.getVolatility();
        let opi = this.getOpenInterest();
        let bsv = this.getBuySellVolume();
        let ohl = this.getOHLCV();
        let ins = this.getInstruments();

        let hold = [await vol, await opi, await bsv, await ohl, await ins];

        this.loading = false;
    }

    getVolatility = async () => {

        const method = '/asset/' + this.symbol + '/volatility';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            this.volatility = res.data.map((d) => {
                d.date = isoParse(d.time);
                d.volatility = +d.volatility;
                return d;
            });
        })
        .catch(err => {
            console.log('[ERROR] /asset/.../volatility', err);
            this.error = err;
        });
    }

    getBuySellVolume = async () => {

        const method = '/asset/' + this.symbol + '/buysellvolume';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            this.buySellVolume = res.data.map((d) => {
                d.date = isoParse(d.time);
                d.buyVolume = +d.buyVolume;
                d.sellVolume = +d.sellVolume;
                d.volume24hr = +d.volume24hr;
                return d;
            });
        })
        .catch(err => {
            console.log('[ERROR] /asset/.../buysellvolume', err);
            this.error = err;
        });
    }

    getOpenInterest = async () => {

        const method = '/asset/' + this.symbol + '/openinterest';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            this.openInterest = res.data.map((d) => {
                d.date = isoParse(d.time);
                d.openInterest = +d.openInterest;
                return d;
            })
        })
        .catch(err => {
            console.log('[ERROR] /asset/.../openinterest', err);
            this.error = err;
        });
    }

    getOHLCV = async () => {

        const method = '/asset/' + this.symbol + '/ohlcv';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            this.ohlcv = res.data.map((d) => {
                d.date = isoParse(d.time);
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
                return d;
            });
        })
        .catch(err => {
            console.log('[ERROR] /asset/.../ohlcv');
            this.error = err;
        });


    }

    getInstruments = async () => { 
    
        const method = '/asset/bitmex';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            this.instruments = res.data.map((d) => {
                d.value = d.symbol;
                d.label = d.symbol;
                return d;
            });
        })
        .catch(err => {
            console.log('[ERROR] /asset/bitmex', err);
            this.error = err;
        });

    }

    changeInstrument = (option) => { 
        this.instrument = option; 
    }

    get symbol() {
        if (this.instrument && this.instrument.hasOwnProperty('value')) {
            return this.instrument.value;
        } else {
            return 'XBTUSD';
        }
    }

}

export default decorate(FuturesData, {
    loading: observable,
    error: observable,
    instrument: observable,
    instruments: observable,
    volatility: observable,
    openInterest: observable,
    buySellVolume: observable,
    ohlcv: observable,

    init: action.bound,
    getVolatility: action.bound,
    getBuySellVolume: action.bound,
    getOpenInterest: action.bound,
    getOHLCV: action.bound,
    getInstruments: action.bound,
    changeInstrument: action.bound,

    symbol: computed,
});
