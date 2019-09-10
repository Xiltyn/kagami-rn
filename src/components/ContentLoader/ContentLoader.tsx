import * as React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { styles } from './ContentLoader.styles';
import { Color } from 'csstype';

export namespace ContentLoader {
    export interface Props {
        message?:string;
        size:number;
        color:Color;
    }
}

export class ContentLoader extends React.Component<ContentLoader.Props> {

    public render():React.ReactNode {
        const { message, size, color } = this.props;

        return (
            <View style={ styles.container }>
                <ActivityIndicator
                    style={ styles.loaderSpinner }
                    size={ size }
                    color={ color } />
                {
                    message && <Text style={ styles.loaderMessage }>{ message }</Text>
                }
            </View>
        );
    }
}
