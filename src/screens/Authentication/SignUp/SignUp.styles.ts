import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import global, {HeroHeader, ScreenWrapper} from '../../../shared/styles/global.styles';

export const Container = styled(ScreenWrapper)`
    padding: 128px ${global.layout.spacing.wide} 150px;
    background: ${global.colours.dark};
`;

export const SignUpWrapper = styled.View`
    align-items: center;
    margin-top: 72px;
    margin-bottom: 16px;
`;

export const SignUpHeader = styled(HeroHeader)`
    color: ${global.colours.light};
`;

export const ButtonContainer = styled.View`
    align-items: center;
    margin-top: 10px;
`;

export const TextRow = styled.View`
    margin-top: ${global.layout.spacing.wide};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Text = styled.Text`
    font-family: ${global.fonts.regular};
    color: ${global.colours.grey};
`;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00f',
    },
    signUpContainer: {
        alignItems: 'center',
        marginTop: 74,
        marginBottom: 15,
    },
    signUpHeader: {
        //width: 77,
        height: 44,
        //fontFamily: 'lato-regular',
        fontSize: 22,
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 22,
        letterSpacing: -0.53,
        textAlign: 'center',
        color: '#fff',
    },
    createContainer: {
        alignItems: 'center',
        marginBottom: 31,
    },
    createHeader: {
        color: '#fff',
        fontSize: 17,
        //fontFamily: 'sans-serif-medium',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
});
