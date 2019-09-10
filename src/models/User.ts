import { BaseIndexer, DataModel } from '../shared/types/DataModel';

export interface IUser extends BaseIndexer<''> {
    email?: string;
    phone?: string;
    name: string;
    id: number;
    avatar?: string;
}

export class User extends DataModel<User, IUser, ''> implements IUser {
    email: string = '';
    phone: string = '';
    name: string = '';
    id: number = 0;
    avatar?: string;

    public constructor(data?: IUser, showLogs: boolean = false) {
        super();

        if(data) {
            this.assignData<User, IUser>(this, data, showLogs);
        }
    }
}
