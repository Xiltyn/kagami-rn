import { handleActions } from 'redux-actions';
import { MapActions } from './actions';
import { requestStatusType } from '../../shared/types/RequestStatus';
import { RootState } from '../index';
import { Map } from '../../models/Map';

const initialState: RootState.MapState = {
    points: [],
    status: {
        type: requestStatusType.IDLE,
        message: '',
    },
};

export const MapReducer = handleActions<RootState.MapState, Map>(
    {
        [ MapActions.Type.SET_MAP_SUCCESS ]: (state, action) => ({
            ...state,
            points: action.payload.points ? action.payload.points : state.points,
            status: action.payload.status ? action.payload.status : state.status,
        }),
        [ MapActions.Type.SET_MAP_FAILURE ]: (state, action) => ({
            ...state,
            status: action.payload.status ? action.payload.status : state.status,
        }),
    },
    initialState,
);
