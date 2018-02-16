import { action, observable } from 'mobx';

export class Book {
    @observable id;
    @observable name;
    @observable publisherId;
    @observable authorIds;

    constructor(id = '', name = '', publisherId = '', authorIds = []) {
        this.id = id;
        this.name = name;
        this.publisherId = publisherId;
        this.authorIds = authorIds;
    }

    clone() {
        return new Book(
            this.id,
            this.name,
            this.publisherId,
            this.authorIds.slice()
        );
    }

    @action
    setId(id) {
        this.id = id;
    }

    @action
    setName(name) {
        this.name = name;
    }

    @action
    setPublisherId(publisherId) {
        this.publisherId = publisherId;
    }

    @action
    setAuthorIds(authorIds) {
        this.authorIds = authorIds;
    }
}
