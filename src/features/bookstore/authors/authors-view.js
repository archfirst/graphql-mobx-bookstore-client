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
import { Author } from 'shared/domain';
import { AuthorDialog } from './author-dialog';

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
class AuthorsViewBase extends React.Component {
    static propTypes = {
        rootStore: PropTypes.object.isRequired
    };

    @observable openDialog = false;
    @observable isNew = false;
    @observable author = new Author();

    render() {
        const { classes, rootStore } = this.props;
        const { authorStore: { authorMap } } = rootStore;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant="title">Authors</Typography>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authorMap.values().map(author => (
                                <TableRow
                                    hover
                                    key={author.id}
                                    onClick={() => this.onRowClicked(author)}
                                >
                                    <TableCell>{author.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <AuthorDialog
                    author={this.author}
                    isNew={this.isNew}
                    open={this.openDialog}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            </div>
        );
    }

    @action
    onAddClicked = () => {
        this.author = new Author();
        this.isNew = true;
        this.openDialog = true;
    };

    @action
    onRowClicked = author => {
        this.author = author.clone();
        this.isNew = false;
        this.openDialog = true;
    };

    @action
    onSave = () => {
        this.openDialog = false;

        const { rootStore: { authorStore } } = this.props;
        this.isNew
            ? authorStore.createAuthor(this.author)
            : authorStore.updateAuthor(this.author);
    };

    @action
    onCancel = () => {
        this.openDialog = false;
    };
}

export const AuthorsView = withStyles(styles)(AuthorsViewBase);
