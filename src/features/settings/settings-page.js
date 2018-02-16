import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});

function SettingsPageBase({ classes }) {
    return (
        <div className={classes.root}>
            <Typography variant="title">Settings</Typography>
        </div>
    );
}

export const SettingsPage = withStyles(styles)(SettingsPageBase);
