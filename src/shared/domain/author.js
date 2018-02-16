import { action, observable } from 'mobx';

export class Author {
    @observable id;
    @observable name;

    constructor(id = '', name = '') {
        this.id = id;
        this.name = name;
    }

    clone() {
        return new Author(this.id, this.name);
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
