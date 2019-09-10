import * as React from 'react';
import {WrappedFieldProps} from 'redux-form';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

export namespace InputValidation {
    export interface Props {
        children: React.ReactNode;
        style?: StyleProp<ViewStyle>;
        row?: boolean;
    }
}

export const InputValidation = (props: WrappedFieldProps & InputValidation.Props) => {
    return (
        <View style={ props.style }>
                {props.children}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                    props.meta.touched && props.meta.error && <Text>{props.meta.error}</Text>
                }
            </View>
        </View>
    );
};
