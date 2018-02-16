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
class AuthorDialogBase extends React.Component {
    static propTypes = {
        author: PropTypes.object,
        isNew: PropTypes.bool.isRequired,
        open: PropTypes.bool.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    render() {
        const { classes, author, isNew, open, onSave, onCancel } = this.props;

        return (
            <Dialog open={open} classes={{ paper: classes.dialogPaper }}>
                <DialogTitle>
                    {isNew ? 'Create Author' : 'Edit Author'}
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField
                        id="id"
                        name="id"
                        label="Id"
                        value={author.id}
                        onChange={this.onIdChange}
                        disabled={isNew ? false : true}
                        margin="normal"
                    />
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={author.name}
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
        const { author } = this.props;
        author.setId(event.target.value);
    };

    onNameChange = event => {
        const { author } = this.props;
        author.setName(event.target.value);
    };
}

export const AuthorDialog = withStyles(styles)(AuthorDialogBase);
