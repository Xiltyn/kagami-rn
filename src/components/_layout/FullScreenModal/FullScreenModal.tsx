import * as React from 'react';
import { Header, LeftButton, ModalWrapper, Title } from './FullScreenModal.styles';
import { Button, IconSets } from '../../_universal/Button/Button';
import global from '../../../shared/styles/global.styles';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Color } from 'csstype';

export namespace FullScreenModal {
    export interface Props {
        title: string;
        headerColor?: Color;
        back?: actionConfig;
        next?: actionConfig;
        close?: actionConfig;
        confirm?: actionConfig;
    }

    export interface State {

    }

    export type actionConfig = {
        label?: string;
        action: (...args: any) => void;
    };
}

export class FullScreenModal extends React.Component<FullScreenModal.Props, FullScreenModal.State> {
    public static defaultProps: Partial<FullScreenModal.Props> = {
        title: 'Full Screen Modal',
    };

    public render() {
        const {
            title,
            back,
            next,
            close,
            confirm,
            children,
            headerColor,
        } = this.props;

        return(
            <ModalWrapper
                animationType='slide'>
                <ScrollView>
                    <Header
                        bgColor={ headerColor }>
                        <LeftButton>
                            {
                                close &&
                                    <Button
                                        onPress={close.action}
                                        onLongPress={close.action}
                                        options={ {
                                            iconSet: IconSets.Ionicons,
                                            iconName: 'ios-close',
                                            color: global.colours.dark,
                                            background: headerColor || global.colours.primary,
                                        } }/> || back &&
                                    <Button
                                        onPress={back.action}
                                        onLongPress={back.action}
                                        options={ {
                                            iconSet: IconSets.Ionicons,
                                            iconName: 'ios-arrow-back',
                                            iconSize: 32,
                                            color: global.colours.dark,
                                            background: headerColor || global.colours.primary,
                                        } }/>
                            }
                        </LeftButton>
                        <Title>{ title }</Title>
                        {
                            // Add NEXT BUTTON based on _universal button component
                            // { next && <NextButton title='' onPress={next.action} /> }
                        }
                    </Header>
                    <KeyboardAvoidingView
                        style={ { height: '80%' } }
                        behavior='padding'>
                        { children }
                    </KeyboardAvoidingView>
                    { confirm && <Button
                        onPress={confirm.action}
                        onLongPress={confirm.action}
                        options={ {
                            label: confirm.label || 'Save and Continue',
                            color: global.colours.dark,
                            background: headerColor || global.colours.primary,
                            style: {
                                marginLeft: 16,
                                marginTop: 32,
                                height: 40,
                                width: 328,
                            },
                        } }/> }
                </ScrollView>
            </ModalWrapper>
        );
    }
}
