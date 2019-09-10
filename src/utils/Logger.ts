export namespace Logger {
    export enum COLOR {
        SUCCESS = '#21B764',
        ERROR = '#FF595E',
        WARN = '#ffa600',
        PROCESS = '#a890ff',
        INFO = '#ebebeb',
        IMPORTANT = '#e10ca1',
        BACKGROUND = '#242424',
    }

    export enum STYLE {
        INFO = 'INFO',
        WARN = 'WARN',
        ERROR = 'ERROR',
        SUCCESS = 'SUCCESS',
        PROCESS = 'PROCESS',
        IMPORTANT = 'IMPORTANT',
    }

    export const styles = {
        INFO: 'color: ' + COLOR.BACKGROUND + '; font-weight: 100; background-color: ' + COLOR.INFO,
        ERROR: 'color: ' + COLOR.ERROR + '; font-weight: 600; background-color: ' + COLOR.BACKGROUND,
        SUCCESS: 'color: ' + COLOR.SUCCESS + '; font-weight: 600; background-color: ' + COLOR.BACKGROUND,
        PROCESS: 'color: ' + COLOR.BACKGROUND + '; font-weight: 300; background-color: ' + COLOR.PROCESS,
        WARN: 'color: ' + COLOR.WARN + '; font-weight: 300; background-color: ' + COLOR.BACKGROUND,
        IMPORTANT: 'color: ' + COLOR.IMPORTANT
                   + '; font-weight: 800; letter-spacing: .1rem; background-color: '+ COLOR.BACKGROUND,
    };

    export const log = (message:string, payload:any|any[], style?:STYLE) => {
        if (__DEV__) {
            const logMessage = `%c===> ${message}`;
            const logPayload = payload && payload;
            const logStyle = `${style ? styles[ style ] : ''}`;
            return console.log(logMessage, logStyle, logPayload);
        }
    };
}
