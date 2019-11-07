import {
    decorate,
    observable,
    action,
    computed,
    autorun,
    toJS,
} from 'mobx';
import axios from 'axios';

class AssetData {

    loading = false;
    error = '';

    assets = [];

    constructor(root) {
        this.root = root;
    }

    init = async () => {

        await this.getAssets();
    }

    getAssets = async () => {

        const method = '/market/assets';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            console.log('Assets', res.data);
            this.assets = res.data;
        })
        .catch(err => {
            console.log('[ERROR] /market/assets:', err)
            this.error = err;
        });
    }

}

export default decorate(AssetData, {
    loading: observable,
    error: observable,
    assets: observable,

    init: action.bound,
});
