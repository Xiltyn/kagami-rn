import { BaseIndexer, DataModel } from '../shared/types/DataModel';
import RequestStatus, { requestStatusType } from '../shared/types/RequestStatus';
import { IUser } from './User';

enum registerPayloadKeys {
    email = 'email',
    password = 'password',
    password_confirm = 'password_confirm',
}

export type RegisterPayload = {
    [key in registerPayloadKeys]: string;
};

enum AuthSagaArgsKeys {
    email = 'email',
    password = 'password',
}

export type AuthSagaArgs = {
    [key in AuthSagaArgsKeys]: string;
};

export interface IAuth extends BaseIndexer<IUser|RequestStatus> {
    user:IUser|null;
    token:string|null;
    status?:RequestStatus;
}

export class Auth extends DataModel<Auth, IAuth, IUser|RequestStatus> implements IAuth {
    public user:IUser|null = null;
    public token:string|null = null;
    public status:RequestStatus = {
        type: requestStatusType.IDLE,
        message: '',
    };

    constructor(data?: IAuth) {
        super();

        if(data) this.assignData<this, IAuth>(data);
    }

}
