import { combineReducers } from 'redux';
import { AuthenticationReducer } from './Authentication/reducer';
import { FormStateMap, reducer as FormReducer } from 'redux-form';
import { MapReducer } from './Map/reducer';
import { IAuth } from '../models/Authentication';
import { IMap } from '../models/Map';

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
    auth: AuthenticationReducer as any,
    form: FormReducer as any,
    map: MapReducer as any,
});

export interface RootIndexer {
    [key:string]: IAuth|FormStateMap|any;
}

export interface RootState extends RootIndexer {
    auth: IAuth;
    map: IMap;
    form: FormStateMap;
}

export namespace RootState {
    export type AuthState = IAuth;
    export type MapState = IMap;
}
