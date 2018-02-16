import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Book } from 'shared/domain';
import { BookDialog } from './book-dialog';

const styles = theme => ({
    root: {
        flex: 1,
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paper: {
        flex: 1,
        overflow: 'auto'
    }
});

@observer
class BooksViewBase extends React.Component {
    static propTypes = {
        rootStore: PropTypes.object.isRequired
    };

    @observable openDialog = false;
    @observable isNew = false;
    @observable book = new Book();

    render() {
        const { classes, rootStore } = this.props;
        const {
            authorStore: { authorMap },
            bookStore: { bookMap },
            publisherStore: { publisherMap }
        } = rootStore;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant="title">Books</Typography>
                    <Button
                        size="small"
                        color="primary"
                        onClick={this.onAddClicked}
                    >
                        Add
                    </Button>
                </div>

                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Publisher</TableCell>
                                <TableCell>Authors</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookMap.values().map(book => (
                                <TableRow
                                    hover
                                    key={book.id}
                                    onClick={() => this.onRowClicked(book)}
                                >
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>
                                        {book.publisherId
                                            ? publisherMap.get(book.publisherId)
                                                  .name
                                            : null}
                                    </TableCell>
                                    <TableCell>
                                        {book.authorIds
                                            .map(id => authorMap.get(id).name)
                                            .join(', ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <BookDialog
                    book={this.book}
                    isNew={this.isNew}
                    publisherMap={publisherMap}
                    open={this.openDialog}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            </div>
        );
    }

    @action
    onAddClicked = () => {
        this.book = new Book();
        this.isNew = true;
        this.openDialog = true;
    };

    @action
    onRowClicked = book => {
        this.book = book.clone();
        this.isNew = false;
        this.openDialog = true;
    };

    @action
    onSave = () => {
        this.openDialog = false;

        const { rootStore: { bookStore } } = this.props;
        this.isNew
            ? bookStore.createBook(this.book)
            : bookStore.updateBook(this.book);
    };

    @action
    onCancel = () => {
        this.openDialog = false;
    };
}

export const BooksView = withStyles(styles)(BooksViewBase);
