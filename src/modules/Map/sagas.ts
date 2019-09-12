import { Action } from 'redux-actions';
import { Logger } from '../../utils/Logger';
import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { MockApi } from '../../utils/MockRequest';
import { coords, MarkerModel } from '../../models/Marker';
import { MapActions } from './actions';
import { requestStatusType } from '../../shared/types/RequestStatus';

export class MapSaga {
    private static mockApi = new MockApi();

    protected static *initMap(action: Action<{ config: MapSaga.MapConfig }>) {
        console.log('initMap action :: ', action);

        if(action.payload.config.generateMarkers)
            yield fork(MapSaga.getPoints, action.payload.config.location, action.payload.config.debug);

        if(action.payload.config.debug)
            Logger.log('Map Saga: Map initialisation completed',
            '', Logger.STYLE.PROCESS);
    }

    protected static *getPoints(location?: coords, debug?: boolean) {
        try {
            const _RES = yield call(
                MapSaga.mockApi.request,
                {
                    points: [
                        new MarkerModel(location && { location }),
                        new MarkerModel(location && { location }),
                        new MarkerModel(location && { location }),
                        new MarkerModel(location && { location }),
                        new MarkerModel(location && { location }),
                    ],
                },
                {},
            );

            if(_RES.error) {
                yield MapSaga.getPointsFailure(_RES.error);

                if(debug) Logger.log('Map Saga: Get Points failed', {
                        status: _RES.error.status,
                        message: _RES.error.message,
                    }, Logger.STYLE.ERROR,
                );
            } else {
                yield MapSaga.getPointsSuccess(_RES.data);

                if(debug) Logger.log('Map Saga: Get Points succeeded', { _RES }, Logger.STYLE.SUCCESS);
            }
        } catch (err) {
            if (err instanceof Error) {
                if(debug) Logger.log('Map Saga: Login request failed with error', {
                    ...err,
                }, Logger.STYLE.ERROR);

                yield MapSaga.getPointsFailure(err.stack!);
            } else {
                if(debug) Logger.log('Map Saga: Unknown error occurred', '', Logger.STYLE.ERROR);

                yield MapSaga.getPointsFailure('Map Saga: Unknown error occured.');
            }
        }
    }

    protected static *getPointsSuccess(data: any) {
        const status = {
            type: requestStatusType.SUCCESS,
            message: 'successfully loaded map points',
        };

        yield put(MapActions.setMapSuccess({
            points: data.points,
            status,
        }));
    }

    protected static *getPointsFailure(err: string) {
        const status = {
            type: requestStatusType.ERROR,
            message: err,
        };

        yield put(MapActions.setMapFailure({
            status,
        }));
    }

    protected static *watchMap() {
        yield takeEvery(MapActions.Type.INIT_MAP, MapSaga.initMap);
    }

    public static *init() {
        yield all([
            fork(MapSaga.watchMap),
        ]);
    }
}

export namespace MapSaga {
    export interface MapConfig {
        debug?: boolean;
        location?: coords;
        generateMarkers?: boolean;
    }
}
