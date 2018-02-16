import { action, observable } from 'mobx';

export class Publisher {
    @observable id;
    @observable name;

    constructor(id = '', name = '') {
        this.id = id;
        this.name = name;
    }

    clone() {
        return new Publisher(this.id, this.name);
    }

    @action
    setId(id) {
        this.id = id;
    }

    @action
    setName(name) {
        this.name = name;
    }
}
