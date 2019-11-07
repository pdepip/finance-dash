import {
    observable,
    computed,
    decorate,
    action,
} from 'mobx';

class PortfolioStore {

    strokeColor = "#21ce99";

    portfolioData = [0,2,5,9,5,10,3,5,0,0,1,8,2,9,12];
    
    constructor(props) {
        this.props = props;
    }
}

export default decorate(PortfolioStore, {
    strokeColor: observable,
    portfolioData: observable,
});
