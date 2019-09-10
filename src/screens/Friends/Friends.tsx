import React from 'react';
import { View, Text } from 'react-native';
import { NavigationTransitionProps } from 'react-navigation';

export namespace Friends {
    export interface Props {
    }

    export interface NavigationOptions {
    }
}

export class Friends extends React.Component<Friends.Props & NavigationTransitionProps> {
    static navigationOptions: Friends.NavigationOptions = {
        header: null,
    };

    public render() {
        return (
            <View>
                <Text>
                    Friends Screen
                </Text>
            </View>
        );
    }
}
