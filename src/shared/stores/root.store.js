import { RouterState, RouterStore } from 'mobx-state-router';
import { AuthorStore } from './author.store';
import { BookStore } from './book.store';
import { PublisherStore } from './publisher.store';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    authorStore = new AuthorStore(this);
    bookStore = new BookStore(this);
    publisherStore = new PublisherStore(this);
    routerStore = new RouterStore(this, routes, notFound);

    // ----- Lifecycle hooks -----
    // Useful for starting and stopping observers, autoruns and reactions

    init() {
        this.authorStore.init();
        this.bookStore.init();
        this.publisherStore.init();
    }

    destroy() {
        this.authorStore.destroy();
        this.bookStore.destroy();
        this.publisherStore.destroy();
    }
}
