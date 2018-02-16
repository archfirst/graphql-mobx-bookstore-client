import React from 'react';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

const palette = {
    primary: blue,
    secondary: pink,
    error: red,
    type: 'light'
};

const typography = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
};

const theme = createMuiTheme({ palette, typography });

export const MuiDecorator = story =>
    <MuiThemeProvider theme={theme}>
        {story()}
    </MuiThemeProvider>;
