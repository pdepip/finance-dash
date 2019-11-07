import {
    computed,
    decorate,
    action,
} from 'mobx';

class StatsStore {

    constructor(props) {
        this.props = props;
    }

    lastStatValue(statName) {
        if (this.props.marketData.stats.length > 1) {
            let last = this.props.marketData.stats[this.props.marketData.stats.length - 1][statName];
            let n = this.props.marketData.stats[this.props.marketData.stats.length - 1][statName];
            let o = this.props.marketData.stats[this.props.marketData.stats.length - 2][statName];

            if (n < o) {
                n *= -1
            }

            return n;
        } else {
            return 0.0;
        }
    }

    statChange (statName) {
        if (this.props.marketData.stats.length > 1) {
            let n = this.props.marketData.stats[this.props.marketData.stats.length - 1][statName];
            let o = this.props.marketData.stats[this.props.marketData.stats.length - 2][statName];
            return ((n - o) / o * 100).toFixed(2);
        } else {
            return 0.0;
        }
    }

    statData (statName) {
        if (this.props.marketData.stats.length > 0) {
            return this.props.marketData.stats.map((stat) => {
                return stat[statName];
            });
        } else {
            return [];
        }

    }

    statTrend(statName) {

        let value;

        if (this.props.marketData.stats.length > 0) {
            let last = this.props.marketData.stats[this.props.marketData.stats.length - 1][statName];
            let first = this.props.marketData.stats[0][statName];

            if (last > first) {
                // green
                value = "#21ce99";
            } else if (last < first) {
                // red
                value = "#f45531";
            } else {
                // neutral
                value = "#000";
            }
        } else {
            value = "#000";
        }

        return value;
    }

}

export default decorate(StatsStore, {
    hasData: action.bound,
});
