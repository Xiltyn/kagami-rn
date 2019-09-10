import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
    },
    devIcon: {
        position: 'absolute',
        top: 40,
        left: 16,
        //backgroundColor: appColors.PRIMARY,
        //shadowColor: appColors.GREY_DARK,
        shadowRadius: 16,
        padding: 8,
        borderRadius: 8,
        overflow: 'hidden',
        zIndex: 999,
    },
    helpLinkText: {
        fontSize: 16,
        //color: appColors.PRIMARY,
    },
    developmentModeContainer: {
        height: '100%',
        padding: 16,
        paddingTop: 120,
        paddingBottom: 120,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    developmentModeInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    developmentModeText: {
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
});
