import {
    decorate,
    observable,
    action,
    computed,
    autorun,
    toJS,
} from 'mobx';
import axios from 'axios';

class NewsData {

    loading = false;
    error = '';

    entities = [];
    trending = [];
    articles = [];

    constructor(root) {
        this.root = root;
    }

    init = async () => {

        this.loading = true;

        let entities = this.getEntities();
        let latest = this.getLatestNews();
        let trending = this.getTrendingNews();

        let hold = [
            await entities,
            await latest,
            await trending,
        ];

        this.loading = false;
    }

    getEntities = async () => {
        const method = '/news/entities';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            console.log('entities', res.data);
            this.entities = res.data
        })
        .catch(err => {
            console.log('[ERROR] /news/entities:', err);
            this.error = err;
        });
    }

    getLatestNews = async () => {
        const method = '/news';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            console.log('articles', res.data);
            this.articles = res.data;
        })
        .catch(err => {
            console.log('[ERROR] /news/:', err);
            this.error = err;
        });

    }

    getTrendingNews = async () => {
        const method = '/news/top';
        const url = process.env.REACT_APP_API_ADDR + method;

        await axios
        .get(url)
        .then(res => {
            console.log('top', res.data);
            this.trending = res.data;
        })
        .catch(err => {
            console.log('[ERROR] /news/top:', err);
            this.error = err;
        });
    }

}

export default decorate(NewsData, {
    loading: observable,
    error: observable,
    entities: observable,
    trending: observable,
    articles: observable,

    init: action.bound,
});
