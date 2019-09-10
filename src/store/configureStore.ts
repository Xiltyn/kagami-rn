import { applyMiddleware, Store, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, RootState } from '../modules/';
import { AuthSaga } from '../modules/Authentication/sagas';
import { MapSaga } from '../modules/Map/sagas';

export function configureStore(initialState?:RootState):Store<RootState> {
    //@ts-ignore
    const _WINDOW = window as any;
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = __DEV__ ? _WINDOW.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
    const middleware = [ sagaMiddleware ];
    const store = createStore(
        rootReducer as any,
        initialState as any,
        composeEnhancers(applyMiddleware(...middleware))) as Store<RootState>;

    sagaMiddleware.run(AuthSaga.AuthSagas);
    sagaMiddleware.run(MapSaga.MapSagas);

    return store;
}
