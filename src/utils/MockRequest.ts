import { BaseIndexer } from '../shared/types/DataModel';

export class MockApi implements MockApi.Indexer {
    public request: MockApi.Function = (data, options) =>
        new Promise(async (resolve, reject) => {
            try {
                setTimeout(() => {
                    return resolve({
                        data,
                        options,
                        status: 200,
                        message: 'OK',
                    });
                }, 3000);
            } catch (e) {
                return reject({
                    options,
                    data: null,
                    status: 500,
                    message: 'Error: External Server Error',
                });
            }
    });
}

export namespace MockApi {
    interface MockResult<Opts, Data> {
        data: Data|null;
        status: 200|404|500;
        message: string;
        options: Opts|null;
    }

    export type Function = <O, D>(data: D, options: O) => Promise<MockResult<O, D>>;

    export interface Indexer extends BaseIndexer<Function> {
        [key: string]: Function;
    };
}
