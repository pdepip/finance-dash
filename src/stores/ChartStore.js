import { decorate, observable, computed, action } from 'mobx';
import axios from 'axios';

class ChartStore {

    loading = false;
    error = null;

    sourceOption = null;
    sourceOptions = [
        {
            label: 'Binance',
            value: 'binance',
        },
    ];

    dataOption = null;
    dataOptions = [];
    
    sourceData = [];

    constructor(scene) {
        this.scene = scene;
    }

    fetchSourceOptions = async (source) => {

        this.loading = true;

        const method = '/exchange/' + source + '/markets';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            console.log('exchange markets', res.data);
            this.dataOptions = res.data.map((d) => {
                d.value = d.symbol;
                d.label = d.symbol;
                return d;
            });

            this.loading = false;
        })
        .catch(err => {
            console.log('[ERROR] /exchange/' + source + '/markets', err)
            this.error = err;

            this.loading = false;
        });

    }

    handleSourceChange = (option) => {
        this.sourceOption = option;
        this.fetchSourceOptions(option.value);
    }

    handleDataChange = (option) => {
        console.log('changing data');
        this.dataOption = option;
        console.log(this.dataOption);
    }


}

export default decorate(ChartStore, {
    loading: observable,
    error: observable,
    sourceOption: observable,
    sourceOptions: observable,
    dataOptions: observable,
    dataOption: observable,

    handleSourceChange: action.bound,
    fetchSourceOptions: action.bound,
});
