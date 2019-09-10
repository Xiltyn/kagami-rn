import { createAction } from 'redux-actions';
import { Auth } from '../../models/Authentication';

export namespace AuthenticationActions {
    export enum Type {
        IS_LOGGED_IN = 'IS_LOGGED_IN',

        LOGIN = 'LOGIN',
        LOGIN_SUCCESS = 'LOGIN_SUCCESS',
        LOGIN_FAILURE = 'LOGIN_FAILURE',

        REGISTER = 'REGISTER',
        REGISTER_SUCCESS = 'REGISTER_SUCCESS',
        REGISTER_FAILURE = 'REGISTER_FAILURE',
    }

    export const isLoggedIn = createAction<{token: string}>(Type.IS_LOGGED_IN);

    export const login = createAction<{email: string; password: string}>(Type.LOGIN);
    export const loginFailure = createAction<PartialPick<Auth, 'statusMessage'>>(Type.LOGIN_FAILURE);
    export const loginSuccess = createAction<PartialPick<Auth, 'user'|'token'>>(Type.LOGIN_SUCCESS);

    export const register = createAction(Type.REGISTER);
    export const registerFailure = createAction<PartialPick<Auth, 'statusMessage'>>(Type.REGISTER_FAILURE);
    export const registerSuccess = createAction<PartialPick<Auth, 'user'|'token'>>(Type.REGISTER_SUCCESS);
}

export type AuthenticationActions = Omit<typeof AuthenticationActions, 'Type'>;
