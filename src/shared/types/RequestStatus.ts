export enum requestStatusType {
    IDLE = 'idle',
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success',
}

export default interface RequestStatus {
    type: requestStatusType;
    message?: string;
}
