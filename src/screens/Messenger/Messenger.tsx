import React from 'react';
import {View, Text} from 'react-native';
import {NavigationTransitionProps} from 'react-navigation';

export namespace Messenger {
    export interface Props {
    }

    export interface NavigationOptions {
    }

    export type MessengerActions = {
    };
}

export class Messenger extends React.Component<Messenger.Props & NavigationTransitionProps> {
    static navigationOptions: Messenger.NavigationOptions = {
        header: null,
    };

    public render() {
        return (
            <View>
                <Text>
                    Messenger Screen
                </Text>
            </View>
        );
    }
}
