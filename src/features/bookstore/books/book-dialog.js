import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

const styles = {
    dialogPaper: {
        width: 400
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    }
};

@observer
class BookDialogBase extends React.Component {
    static propTypes = {
        book: PropTypes.object,
        isNew: PropTypes.bool.isRequired,
        publisherMap: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    render() {
        const {
            classes,
            book,
            isNew,
            publisherMap,
            open,
            onSave,
            onCancel
        } = this.props;

        return (
            <Dialog open={open} classes={{ paper: classes.dialogPaper }}>
                <DialogTitle>{isNew ? 'Create Book' : 'Edit Book'}</DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField
                        id="id"
                        name="id"
                        label="Id"
                        value={book.id}
                        onChange={this.onIdChange}
                        disabled={isNew ? false : true}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={book.name}
                        onChange={this.onNameChange}
                        margin="normal"
                    />
                    <FormControl>
                        <InputLabel htmlFor="publisher">Publisher</InputLabel>
                        <Select
                            value={book.publisherId}
                            onChange={this.onPublisherChange}
                            input={<Input id="publisher" />}
                        >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            {publisherMap.values().map(publisher => (
                                <MenuItem
                                    key={publisher.id}
                                    value={publisher.id}
                                >
                                    {publisher.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="secondary">
                        CANCEL
                    </Button>
                    <Button onClick={onSave} color="primary">
                        SAVE
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    onIdChange = event => {
        const { book } = this.props;
        book.setId(event.target.value);
    };

    onNameChange = event => {
        const { book } = this.props;
        book.setName(event.target.value);
    };

    onPublisherChange = event => {
        const { book } = this.props;
        book.setPublisherId(event.target.value);
    };
}

export const BookDialog = withStyles(styles)(BookDialogBase);
