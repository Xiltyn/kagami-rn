import * as React from 'react';
import { ImageBackgroundProps } from 'react-native';
import { ImageBackground } from './AppBg.styles';

export namespace AppBg {
    export interface Props {
        imageBackgroundProps?: ImageBackgroundProps;
        children?: React.ReactNode;
    }
}

export const AppBg = (props: AppBg.Props) => {
    const backgroundUri = require('../../../../assets/images/app_bg.png');

    return <ImageBackground source={ backgroundUri } {...props.imageBackgroundProps}>
        {props.children}
    </ImageBackground>;
};
