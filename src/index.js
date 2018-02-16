import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { App } from './app';
import registerServiceWorker from './register-service-worker';

// Enable strict mode for MobX. This disallows state changes outside of an action
useStrict(true);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
