import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loaderMessage: {
        position: 'absolute',
        bottom: '35%',
        color: 'blue',
        height: 32,
        width: '100%',
        fontSize: 24,
        //fontFamily: 'lato-regular',
        textAlign: 'center',
    },
    loaderSpinner: {
        width: 72,
        height: 72,
    },
});
