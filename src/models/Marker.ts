import { BaseIndexer, DataModel } from '../shared/types/DataModel';
import fakerStatic from 'faker';

export type resLocation = [ number, number ];

export type postData = Pick<IMarker, 'title'|'description'|'location'>;

export interface IMarker {
    _id?: string;
    title?: string;
    description?: string;
    location: coords;
}

type indexerRest = coords|boolean|string[]|resLocation|IMarker|Partial<IMarker>|Error|Promise<any>;

export type coords = {
    longitude: number;
    latitude: number;
};

export class MarkerModel
    extends DataModel<MarkerModel, IMarker, indexerRest>
    implements BaseIndexer<indexerRest> {

    protected _id!: string;
    protected title!: string;
    protected description!: string;
    protected location!: coords;

    constructor(data?: IMarker) {
        super();

        if(data && data.title && data.description) {
            this.assignData<this, IMarker>(this, data);
        } else if(data && data.location) {
            this.assignData<this, IMarker>(this, this.getDefaults(data.location));
        }
    }

    private getDefaults(initialLocation?: coords): postData {
        return {
            title: fakerStatic.random.words(3),
            description: fakerStatic.lorem.paragraph(3),
            location: this.generateCoords(initialLocation),
        };
    }

    private generateCoords = (initialLocation?: coords): coords => {
        const lonRange = {
            min: initialLocation ? initialLocation.longitude - .1 : 19.5,
            max: initialLocation ? initialLocation.longitude + .1 : 19.6,
        };
        const latRange = {
            min: initialLocation ? initialLocation.latitude - .1 : 50,
            max: initialLocation ? initialLocation.latitude + .1 : 50.1,
        };
        const rndLon = parseFloat((Math.random() * (lonRange.max - lonRange.min) + lonRange.min).toFixed(6));
        const rndLat = parseFloat((Math.random() * (latRange.max - latRange.min) + latRange.min).toFixed(6));

        return { longitude: rndLon, latitude: rndLat };
    };

    public get coords(): coords {
        return this.location;
    }

    public get meta(): Partial<IMarker> {
        return {
            title: this.title,
            description: this.description,
        };
    }

    public get postData(): postData {
        return {
            title: this.title,
            description: this.description,
            location: this.generateCoords(),
        };
    }
}
