import React from 'react';
import { App } from './containers/App/App';

import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

export const action = (type: string, payload: { [key: string]: any }) => store.dispatch({
    type,
    payload,
});

// Root is, after being transpiled by TSC, imported into ~/App.js
export const Root:(() => React.ReactNode) = () =>
    <Provider store={ store }>
        <App />
    </Provider>;
