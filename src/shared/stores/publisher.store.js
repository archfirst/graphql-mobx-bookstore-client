import { execute, makePromise } from 'apollo-link';
import gql from 'graphql-tag';
import { action, observable, ObservableMap } from 'mobx';
import { httpLink, webSocketLink } from 'config';
import { Publisher } from 'shared/domain';

const publishersQuery = gql`
    {
        publishers {
            id
            name
        }
    }
`;

const createPublisherMutation = gql`
    mutation CreatePublisher($id: ID!, $name: String!) {
        createPublisher(id: $id, name: $name) {
            id
            name
        }
    }
`;

const updatePublisherMutation = gql`
    mutation UpdatePublisher($id: ID!, $name: String!) {
        updatePublisher(id: $id, name: $name) {
            id
            name
        }
    }
`;

const publisherAddedSubscription = gql`
    subscription publisherAdded {
        publisherAdded {
            id
            name
        }
    }
`;

const publisherUpdatedSubscription = gql`
    subscription publisherUpdated {
        publisherUpdated {
            id
            name
        }
    }
`;

export class PublisherStore {
    rootStore;
    @observable isLoading = true;
    @observable error = null;
    @observable publisherMap = new ObservableMap();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    init() {
        // Set up subscriptions
        execute(webSocketLink, { query: publisherAddedSubscription }).subscribe(
            {
                next: result => this.setPublisher(result.data.publisherAdded),
                error: error => this.setError(error)
            }
        );
        execute(webSocketLink, {
            query: publisherUpdatedSubscription
        }).subscribe({
            next: result => this.setPublisher(result.data.publisherUpdated),
            error: error => this.setError(error)
        });
    }

    destroy() {}

    @action
    clearPublishers() {
        this.isLoading = true;
        this.error = null;
        this.publisherMap.clear();
    }

    @action
    setPublishers(publishers) {
        this.isLoading = false;
        publishers.map(publisher => {
            this.publisherMap.set(
                publisher.id,
                new Publisher(publisher.id, publisher.name)
            );
        });
    }

    @action
    setPublisher(publisher) {
        this.publisherMap.set(
            publisher.id,
            new Publisher(publisher.id, publisher.name)
        );
    }

    @action
    setError(error) {
        this.isLoading = false;
        this.error = error;
    }

    load = () => {
        this.clearPublishers();
        makePromise(execute(httpLink, { query: publishersQuery }))
            .then(result => this.setPublishers(result.data.publishers))
            .catch(error => this.setError(error));
    };

    createPublisher = publisher => {
        makePromise(
            execute(httpLink, {
                query: createPublisherMutation,
                variables: { ...publisher }
            })
        ).catch(error => this.setError(error));
    };

    updatePublisher = publisher => {
        makePromise(
            execute(httpLink, {
                query: updatePublisherMutation,
                variables: { ...publisher }
            })
        ).catch(error => this.setError(error));
    };
}
