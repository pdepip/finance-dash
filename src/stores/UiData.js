import {
    decorate,
    observable,
    action,
    computed,
    autorun,
    toJS,
} from 'mobx';

class UiData {

    scene = "todaysMarkets";

    constructor(root) {
        this.root = root;
    }

    init = async () => { }

    // Changes scene based on name
    changeScene = (scene) => {
        this.scene = scene;
    }


}

export default decorate(UiData, {
    scene: observable,

    init: action.bound,
    changeScene: action.bound,
});
