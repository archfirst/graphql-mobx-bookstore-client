import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from 'material-ui/Dialog';
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
class PublisherDialogBase extends React.Component {
    static propTypes = {
        publisher: PropTypes.object,
        isNew: PropTypes.bool.isRequired,
        open: PropTypes.bool.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    render() {
        const {
            classes,
            publisher,
            isNew,
            open,
            onSave,
            onCancel
        } = this.props;

        return (
            <Dialog open={open} classes={{ paper: classes.dialogPaper }}>
                <DialogTitle>
                    {isNew ? 'Create Publisher' : 'Edit Publisher'}
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField
                        id="id"
                        name="id"
                        label="Id"
                        value={publisher.id}
                        onChange={this.onIdChange}
                        disabled={isNew ? false : true}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={publisher.name}
                        onChange={this.onNameChange}
                        margin="normal"
                    />
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
        const { publisher } = this.props;
        publisher.setId(event.target.value);
    };

    onNameChange = event => {
        const { publisher } = this.props;
        publisher.setName(event.target.value);
    };
}

export const PublisherDialog = withStyles(styles)(PublisherDialogBase);
