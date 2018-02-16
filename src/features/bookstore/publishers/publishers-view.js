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
import { Publisher } from 'shared/domain';
import { PublisherDialog } from './publisher-dialog';

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
class PublishersViewBase extends React.Component {
    static propTypes = {
        rootStore: PropTypes.object.isRequired
    };

    @observable openDialog = false;
    @observable isNew = false;
    @observable publisher = new Publisher();

    render() {
        const { classes, rootStore } = this.props;
        const { publisherStore: { publisherMap } } = rootStore;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant="title">Publishers</Typography>
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
                            {publisherMap.values().map(publisher => (
                                <TableRow
                                    hover
                                    key={publisher.id}
                                    onClick={() => this.onRowClicked(publisher)}
                                >
                                    <TableCell>{publisher.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <PublisherDialog
                    publisher={this.publisher}
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
        this.publisher = new Publisher();
        this.isNew = true;
        this.openDialog = true;
    };

    @action
    onRowClicked = publisher => {
        this.publisher = publisher.clone();
        this.isNew = false;
        this.openDialog = true;
    };

    @action
    onSave = () => {
        this.openDialog = false;

        const { rootStore: { publisherStore } } = this.props;
        this.isNew
            ? publisherStore.createPublisher(this.publisher)
            : publisherStore.updatePublisher(this.publisher);
    };

    @action
    onCancel = () => {
        this.openDialog = false;
    };
}

export const PublishersView = withStyles(styles)(PublishersViewBase);
