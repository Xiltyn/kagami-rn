import Constants from 'expo-constants';

export namespace Environment {
    enum Env {
        DEV = 'dev',
        STAGE = 'stage',
        PROD = 'prod',
    }

    export enum Variables {
        API_URL = 'API_URL',
        API_KEY = 'API_KEY',
        ENV = 'ENV',
    }

    type EnvIndexer = {[key in Env]: {[deepKey in Variables]: string}};

    const ENV: EnvIndexer = {
        [Env.DEV]: {
            ENV: Env.DEV,
            API_URL: 'https://reqres.in/api/',
            API_KEY: 'dev_key',
        },
        [Env.STAGE]: {
            ENV: Env.STAGE,
            API_URL: 'https://reqres.in/api/',
            API_KEY: 'stage_key',
        },
        [Env.PROD]: {
            ENV: Env.PROD,
            API_URL: 'https://reqres.in/api/',
            API_KEY: 'prod_key',
        },
    };

    export const getEnvVars = (env = Constants.manifest.releaseChannel) => {
        if (env === Env.STAGE) {
            return ENV[Env.STAGE];
        } else if (env === Env.PROD) {
            return ENV[Env.PROD];
        } else {
            return ENV[Env.DEV];
        }
    };
}

export default Environment.getEnvVars;
