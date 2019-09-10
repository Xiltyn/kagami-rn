import assignData from '../../utils/AssignData';

export interface BaseIndexer<IndexerRest> {
    [key: string]:
        string
        |boolean
        |number
        |null
        |undefined
        |this
        |(
            (...args: any) =>
                void
                |string
                |boolean
                |number
                |null
                |undefined
                |this
                |IndexerRest
        )
        |IndexerRest;
}

export class DataModel<Model, Interface, IndexerRest> implements BaseIndexer<IndexerRest> {
    [key: string]:
        string
        |number
        |null
        |undefined
        |this
        |(
        (...args: any) =>
            void
            |string
            |number
            |null
            |undefined
            |this
            |IndexerRest
        )
        |IndexerRest;

    constructor() {
        this.assignData = assignData.bind(this);
        this.updateData = ((newData: Interface, showLogs?: boolean) =>
            assignData(this, newData, showLogs)).bind(this);
    }

    protected assignData = <A = Model, B = Interface>(...args: any):this => this;
    public updateData = <A = Model, B = Interface>(...args: any):this => this;
}
