import RequestStatus, { requestStatusType } from '../shared/types/RequestStatus';
import { BaseIndexer, DataModel } from '../shared/types/DataModel';
import { MarkerModel } from './Marker';

type indexerRest = MarkerModel[]|RequestStatus;

export interface IMap extends BaseIndexer<indexerRest> {
    points: MarkerModel[];
    status?: RequestStatus;
}

export class Map extends DataModel<Map, IMap, indexerRest> implements BaseIndexer<indexerRest> {
    public points: MarkerModel[] = [];
    public status: RequestStatus = {
        type: requestStatusType.IDLE,
        message: '',
    };

    constructor(data?: IMap) {
        super();

        if(data) this.assignData<this, IMap>(data);
    }

}
