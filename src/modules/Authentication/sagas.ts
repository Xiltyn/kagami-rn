import { apiAuth } from '../../shared/api/apiAuth';
import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { AuthenticationActions } from './actions';
import { IUser, User } from '../../models/User';
import { AuthSagaArgs } from '../../models/Authentication';
import { Action } from 'redux-actions';
import { Logger } from '../../utils/Logger';
import { MockApi } from '../../utils/MockRequest';
import { StorageManager } from '../../utils/StorageManager';
import RequestStatus, { requestStatusType } from '../../shared/types/RequestStatus';

export class AuthSaga {
    private static mockApi = new MockApi();

    public static *isLoggedIn(action: Action<{ token: string }>, debug?: boolean) {
        try {
            const _RES = yield call(AuthSaga.mockApi.request,
                { id: '72nk3543#@%tm42wd3', name: 'mock_user', token: action.payload.token },
                { token: action.payload.token });

            if(_RES.error) {
                if(debug) Logger.log('Auth Saga: Reauthenticate request failed with error', {
                        status: _RES.error.status,
                        message: _RES.error.message,
                    }, Logger.STYLE.ERROR,
                );

                yield AuthSaga.loginFailure(_RES.error);
            } else {
                if(debug) Logger.log('Auth Saga: Reauthenticate request succeeded',
                    {
                        _RES,
                    }, Logger.STYLE.SUCCESS);

                yield AuthSaga.loginSuccess(_RES.data);
            }
        } catch (err) {
            if(debug)  Logger.log('Auth Saga: Reauthenticate request failed with error', {
                ...err,
            }, Logger.STYLE.ERROR);
        }
    }

    public static *dispatchLogin(action: Action<AuthSagaArgs>, debug?: boolean) {
        if(debug) Logger.log(
            'Auth Saga: Dispatching login action',
            { action },
            Logger.STYLE.PROCESS,
        );

        try {
            //const _RES = yield call(apiAuth.signIn, action.payload.email, action.payload.password);
            const _RES = yield call(AuthSaga.mockApi.request,
                { id: '72nk3543#@%tm42wd3', name: 'mock_user', token: 'mock_token' },
                { email: action.payload.email, password: action.payload.password});

            if(_RES.error) {
                yield AuthSaga.loginFailure(_RES.error);

                if(debug) Logger.log('Auth Saga: Login failed', {
                    status: _RES.error.status,
                        message: _RES.error.message,
                    }, Logger.STYLE.ERROR,
                );
            } else {
                yield call(StorageManager.setToken, _RES.data.token);
                yield AuthSaga.loginSuccess(_RES.data);

                if(debug) Logger.log('Auth Saga: Login succeeded', { _RES }, Logger.STYLE.SUCCESS);
            }
        } catch (err) {
            if (err instanceof Error) {
                if(debug) Logger.log('Auth Saga: Login request failed with error', {
                    ...err,
                }, Logger.STYLE.ERROR);

                yield AuthSaga.loginFailure(err.stack!);
            } else {
                if(debug) Logger.log('Auth Saga: Unknown error occurred', '', Logger.STYLE.ERROR);

                yield AuthSaga.loginFailure('An unknown error occured.');
            }
        }
    }

    protected static *loginSuccess(data: any) {
        yield put(AuthenticationActions.loginSuccess({
            user: new User({ id: data.id, name: data.name }),
            token: data.token,
        }));
    }

    protected static *loginFailure(err: string) {
        yield put(AuthenticationActions.loginFailure({
            status: {
                type: requestStatusType.ERROR,
                message: err,
            },
        }));
    }

    public static *dispatchRegister(action: Action<AuthSagaArgs>) {
        try {
            const _RES = yield call(apiAuth.signIn, action.payload.email, action.payload.password);

            if(_RES.error) {
                yield AuthSaga.registerFailure(_RES.error);
            } else {
                yield AuthSaga.registerSuccess(_RES.data);
            }
        } catch (err) {
            if (err instanceof Error) {
                yield AuthSaga.registerFailure(err.stack!);
            } else {
                yield AuthSaga.registerFailure('An unknown error occured.');
            }
        }
    }

    protected static *registerSuccess(data: any) {
        yield put(AuthenticationActions.registerSuccess({
            user: new User({ id: data.id, name: data.name }),
            token: data.token,
        }));
    }

    protected static *registerFailure(err: string) {
        yield put(AuthenticationActions.registerFailure({
            status: {
                type: requestStatusType.ERROR,
                message: err,
            },
        }));
    }

    protected static *dispatchLogout() {
        try {
            const _RES = yield call(AuthSaga.mockApi.request,{
                token: null,
                user: null,
            }, {});

            if(_RES.error) {
                yield AuthSaga.logoutFailure(_RES.error);
            } else {
                yield call(StorageManager.clear);
                yield AuthSaga.logoutSuccess(_RES.data);
            }
        } catch (err) {
            if (err instanceof Error) {
                yield AuthSaga.logoutFailure(err.stack!);
            } else {
                yield AuthSaga.logoutFailure('An unknown error occured.');
            }
        }
    }

    protected static *logoutSuccess(data: any) {
        yield put(AuthenticationActions.logoutSuccess({
            token: data.token,
            user: data.user,
        }));
    }

    protected static *logoutFailure(err: string) {
        yield put(AuthenticationActions.logoutFailure({
            status: {
                type: requestStatusType.ERROR,
                message: err,
            },
        }));
    }

    protected static *watchLogout() {
        yield takeEvery(AuthenticationActions.Type.LOGOUT, AuthSaga.dispatchLogout);
    }

    protected static *watchLogin() {
        yield takeEvery(AuthenticationActions.Type.LOGIN, AuthSaga.dispatchLogin);
    }

    protected static *watchRegister() {
        yield takeEvery(AuthenticationActions.Type.REGISTER, AuthSaga.dispatchRegister);
    }

    protected static *watchIsLoggedIn() {
        yield takeEvery(AuthenticationActions.Type.IS_LOGGED_IN, AuthSaga.isLoggedIn);
    }

    public static *init() {
        yield all([
            fork(AuthSaga.watchLogin),
            fork(AuthSaga.watchLogout),
            fork(AuthSaga.watchRegister),
            fork(AuthSaga.watchIsLoggedIn),
        ]);
    }
}
