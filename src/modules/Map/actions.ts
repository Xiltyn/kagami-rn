import { createAction } from 'redux-actions';
import { Map } from '../../models/Map';
import { MapSaga } from './sagas';

export namespace MapActions {
    export enum Type {
        INIT_MAP = 'INIT_MAP',

        SET_MAP_SUCCESS = 'SET_MAP_SUCCESS',
        SET_MAP_FAILURE = 'SET_MAP_FAILURE',
    }

    export const initMap = createAction<{ config: MapSaga.MapConfig }>(Type.INIT_MAP);
    export const setMapFailure = createAction<PartialPick<Map, 'status'>>(Type.SET_MAP_FAILURE);
    export const setMapSuccess = createAction<PartialPick<Map, 'status'|'points'>>(Type.SET_MAP_SUCCESS);
}

export type MapActions = Omit<typeof MapActions, 'Type'>;
