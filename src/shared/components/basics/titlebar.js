import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import { inject } from 'mobx-react';

const styles = {
    title: {
        flex: 1
    }
};

@inject('rootStore')
class TitlebarBase extends React.Component {
    render() {
        const { children, classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="title"
                        color="inherit"
                    >
                        {children}
                    </Typography>

                    <IconButton color="inherit" onClick={this.onSettingsClick}>
                        <SettingsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

    onSettingsClick = () => {
        const { rootStore: { routerStore } } = this.props;
        routerStore.goTo('settings');
    };
}

export const Titlebar = withStyles(styles)(TitlebarBase);
