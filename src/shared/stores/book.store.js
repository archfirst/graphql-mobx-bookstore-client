import { execute, makePromise } from 'apollo-link';
import gql from 'graphql-tag';
import { action, observable, ObservableMap } from 'mobx';
import { httpLink, webSocketLink } from 'config';
import { Book } from 'shared/domain';

const booksQuery = gql`
    {
        books {
            id
            name
            publisher {
                id
            }
            authors {
                id
            }
        }
    }
`;

const createBookMutation = gql`
    mutation CreateBook(
        $id: ID!
        $name: String!
        $publisherId: ID
        $authorIds: [ID]
    ) {
        createBook(
            id: $id
            name: $name
            publisherId: $publisherId
            authorIds: $authorIds
        ) {
            id
            name
        }
    }
`;

const updateBookMutation = gql`
    mutation UpdateBook($id: ID!, $name: String!) {
        updateBook(id: $id, name: $name) {
            id
            name
        }
    }
`;

const bookAddedSubscription = gql`
    subscription bookAdded {
        bookAdded {
            id
            name
        }
    }
`;

const bookUpdatedSubscription = gql`
    subscription bookUpdated {
        bookUpdated {
            id
            name
        }
    }
`;

export class BookStore {
    rootStore;
    @observable isLoading = true;
    @observable error = null;
    @observable bookMap = new ObservableMap();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    init() {
        // Set up subscriptions
        execute(webSocketLink, { query: bookAddedSubscription }).subscribe({
            next: result => this.setBook(result.data.bookAdded),
            error: error => this.setError(error)
        });
        execute(webSocketLink, {
            query: bookUpdatedSubscription
        }).subscribe({
            next: result => this.setBook(result.data.bookUpdated),
            error: error => this.setError(error)
        });
    }

    destroy() {}

    @action
    clearBooks() {
        this.isLoading = true;
        this.error = null;
        this.bookMap.clear();
    }

    @action
    setBooks(books) {
        this.isLoading = false;
        books.map(book => {
            this.bookMap.set(
                book.id,
                new Book(
                    book.id,
                    book.name,
                    book.publisher.id,
                    book.authors.map(author => author.id)
                )
            );
        });
    }

    @action
    setBook(book) {
        this.bookMap.set(
            book.id,
            new Book(
                book.id,
                book.name
                // Server does not currently send the following in subscriptions
                // book.publisher.id,
                // book.authors.map(author => author.id)
            )
        );
    }

    @action
    setError(error) {
        this.isLoading = false;
        this.error = error;
    }

    load = () => {
        this.clearBooks();
        makePromise(execute(httpLink, { query: booksQuery }))
            .then(result => this.setBooks(result.data.books))
            .catch(error => this.setError(error));
    };

    createBook = book => {
        makePromise(
            execute(httpLink, {
                query: createBookMutation,
                variables: {
                    id: book.id,
                    name: book.name,
                    publisherId: book.publisherId,
                    authorIds: book.authorIds.slice()
                }
            })
        ).catch(error => this.setError(error));
    };

    updateBook = book => {
        makePromise(
            execute(httpLink, {
                query: updateBookMutation,
                variables: {
                    ...book
                }
            })
        ).catch(error => this.setError(error));
    };
}
