import * as React from 'react';
import { TouchableHighlight } from 'react-native';
import { AnchorText } from '../../../shared/styles/global.styles';

export namespace TextLink {
    export interface Props {
        navigate: (...args: any) => void;
        text: string;
    }
}

export const TextLink = (props: TextLink.Props) => {
    const { navigate, text } = props;

    return (
        <TouchableHighlight
            onPress={ navigate }>
            <AnchorText>
                { text }
            </AnchorText>
        </TouchableHighlight>
    );
};
