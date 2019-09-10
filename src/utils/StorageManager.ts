import { AsyncStorage } from 'react-native';
import { Logger } from './Logger';

export class StorageManager {
    public static setToken = async (token: string, debug?: boolean) => {
        try {
            if(debug) Logger.log(
                'StorageManager > setToken SUCCESS :: ',
                { token },
                Logger.STYLE.SUCCESS,
            );

            await AsyncStorage.setItem('token', token);
        } catch (error) {
            if(debug) Logger.log('StorageManager > setToken FAILED :: ', error, Logger.STYLE.ERROR);
        }
    };

    public static getToken = async (debug?: boolean):Promise<string|undefined> => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value) {
                if(debug) Logger.log(
                    'StorageManager > getToken SUCCESS :: ',
                    { token: value},
                    Logger.STYLE.SUCCESS,
                );

                return value;
            } else return undefined;
        } catch (error) {
            if(debug) Logger.log('StorageManager > getToken FAILED :: ', error, Logger.STYLE.ERROR);

            return undefined;
        }
    };

    public static clear = async (debug?: boolean) => {
        try {
            await AsyncStorage.clear();

            if(debug) Logger.log('StorageManager > clear SUCCESS :: ', '', Logger.STYLE.SUCCESS);
        } catch (e) {
            if(debug) Logger.log('StorageManager > clear ERROR :: ', e, Logger.STYLE.ERROR);
        }
    };

}
