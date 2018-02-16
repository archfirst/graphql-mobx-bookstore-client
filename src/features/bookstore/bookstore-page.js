import React from 'react';
import { withStyles } from 'material-ui/styles';
import { inject } from 'mobx-react';
import { Titlebar } from 'shared/components';
import { AuthorsView } from './authors/authors-view';
import { BooksView } from './books/books-view';
import { PublishersView } from './publishers/publishers-view';

const styles = {
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    topPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    leftPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    rightPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    bottomPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }
};

@inject('rootStore')
class BookstorePageBase extends React.Component {
    render() {
        const { classes, rootStore } = this.props;

        return (
            <div className={classes.root}>
                <Titlebar>GraphQL MobX Bookstore</Titlebar>
                <div className={classes.topPanel}>
                    <div className={classes.leftPanel}>
                        <PublishersView rootStore={rootStore} />
                    </div>
                    <div className={classes.rightPanel}>
                        <AuthorsView rootStore={rootStore} />
                    </div>
                </div>
                <div className={classes.bottomPanel}>
                    <BooksView rootStore={rootStore} />
                </div>
            </div>
        );
    }
}

export const BookstorePage = withStyles(styles)(BookstorePageBase);
