import React from 'react';
import { observable } from 'mobx';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Publisher } from 'features/bookstore/publishers/publisher';
import { PublisherDialog } from 'features/bookstore/publishers/publisher-dialog';
import { MuiDecorator } from './mui-decorator';

class PublisherDialogContainer extends React.Component {
    @observable publisher = new Publisher('', '');

    render() {
        return (
            <PublisherDialog
                publisher={this.publisher}
                isNew={true}
                open={true}
                onSave={action('Saved')}
                onCancel={action('Canceled')}
            />
        );
    }
}

storiesOf('PublisherDialog', module)
    .addDecorator(MuiDecorator)
    .add('PublisherDialog', () => (
        <PublisherDialogContainer />
    ));
