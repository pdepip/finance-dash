import { observable, computed, action } from 'mobx';

class MenuStore {
    constructor(scene) {
        this.scene = scene;
    }

    handleChange = (selectedOption) => {
        if (this.scene.globals.bitmexStore.contracts.has(selectedOption.value)) {
            let contract = this.scene.globals.bitmexStore.contracts.get(selectedOption.value);
            this.scene.globals.bitmexStore.setContract(contract);
        }
    }
}

export default MenuStore;
