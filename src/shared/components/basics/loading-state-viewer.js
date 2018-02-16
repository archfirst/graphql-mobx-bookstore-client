import * as React from 'react';
import { BusyIndicator } from './busy-indicator';

const LoadingStateViewer = Component => props => {
    const { loading, error } = props;
    if (typeof loading === 'undefined') {
        console.log(
            `LoadingStateViewer: loading for ${Component.name} is undefined`
        );
    }

    if (loading) {
        return <BusyIndicator />;
    } else if (error) {
        return <div>{error.message}</div>;
    }

    return <Component {...props} />;
};

export { LoadingStateViewer };
