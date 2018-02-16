import { execute, makePromise } from 'apollo-link';
import gql from 'graphql-tag';
import { action, observable, ObservableMap } from 'mobx';
import { httpLink, webSocketLink } from 'config';
import { Author } from 'shared/domain';

const authorsQuery = gql`
    {
        authors {
            id
            name
        }
    }
`;

const createAuthorMutation = gql`
    mutation CreateAuthor($id: ID!, $name: String!) {
        createAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

const updateAuthorMutation = gql`
    mutation UpdateAuthor($id: ID!, $name: String!) {
        updateAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

const authorAddedSubscription = gql`
    subscription authorAdded {
        authorAdded {
            id
            name
        }
    }
`;

const authorUpdatedSubscription = gql`
    subscription authorUpdated {
        authorUpdated {
            id
            name
        }
    }
`;

export class AuthorStore {
    rootStore;
    @observable isLoading = true;
    @observable error = null;
    @observable authorMap = new ObservableMap();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    init() {
        // Set up subscriptions
        execute(webSocketLink, { query: authorAddedSubscription }).subscribe({
            next: result => this.setAuthor(result.data.authorAdded),
            error: error => this.setError(error)
        });
        execute(webSocketLink, { query: authorUpdatedSubscription }).subscribe({
            next: result => this.setAuthor(result.data.authorUpdated),
            error: error => this.setError(error)
        });
    }

    destroy() {}

    @action
    clearAuthors() {
        this.isLoading = true;
        this.error = null;
        this.authorMap.clear();
    }

    @action
    setAuthors(authors) {
        this.isLoading = false;
        authors.map(author => {
            this.authorMap.set(author.id, new Author(author.id, author.name));
        });
    }

    @action
    setAuthor(author) {
        this.authorMap.set(author.id, new Author(author.id, author.name));
    }

    @action
    setError(error) {
        this.isLoading = false;
        this.error = error;
    }

    load = () => {
        this.clearAuthors();
        makePromise(execute(httpLink, { query: authorsQuery }))
            .then(result => this.setAuthors(result.data.authors))
            .catch(error => this.setError(error));
    };

    createAuthor = author => {
        makePromise(
            execute(httpLink, {
                query: createAuthorMutation,
                variables: { ...author }
            })
        ).catch(error => this.setError(error));
    };

    updateAuthor = author => {
        makePromise(
            execute(httpLink, {
                query: updateAuthorMutation,
                variables: { ...author }
            })
        ).catch(error => this.setError(error));
    };
}
