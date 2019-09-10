import { handleActions } from 'redux-actions';
import { AuthenticationActions } from './actions';
import { Auth } from '../../models/Authentication';
import { requestStatusType } from '../../shared/types/RequestStatus';
import { User } from '../../models/User';
import { RootState } from '../';

const initialState:RootState.AuthState = {
    user: new User(),
    token: null,
    status: {
        type: requestStatusType.IDLE,
        message: '',
    },
};

export const AuthenticationReducer = handleActions<RootState.AuthState, Auth>(
    {
        [ AuthenticationActions.Type.LOGIN ]: state => ({
            ...state,
            status: {
                type: requestStatusType.LOADING,
                ...state.status,
            },
        }),
        [ AuthenticationActions.Type.LOGIN_FAILURE ]: (state, action) => ({
            ...state,
            status: action.payload ? action.payload.status : undefined,
        }),
        [ AuthenticationActions.Type.LOGIN_SUCCESS ]: (state, action) => ({
            ...state,
            status: {
                type: requestStatusType.SUCCESS,
                ...state.status,
            },
            user: action.payload ? action.payload.user : null,
            token: action.payload ? action.payload.token : null,
        }),
        [ AuthenticationActions.Type.REGISTER ]: state => ({
            ...state,
            status: {
                type: requestStatusType.LOADING,
                ...state.status,
            },
        }),
        [ AuthenticationActions.Type.REGISTER_FAILURE ]: state => ({
            ...state,
            status: {
                type: requestStatusType.ERROR,
                ...state.status,
            },
        }),
        [ AuthenticationActions.Type.REGISTER_SUCCESS ]: (state, action) => ({
            ...state,
            status: {
                type: requestStatusType.SUCCESS,
                ...state.status,
            },
            user: action.payload ? action.payload.user : null,
            token: action.payload ? action.payload.token : null,
        }),
    },
    initialState,
);
