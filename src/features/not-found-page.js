import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});

function NotFoundPageBase({ classes }) {
    return (
        <div className={classes.root}>
            <Typography variant="title">Settings</Typography>
        </div>
    );
}

export const NotFoundPage = withStyles(styles)(NotFoundPageBase);
