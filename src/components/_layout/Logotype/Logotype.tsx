import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Image, logoTypes, LogoWrapper } from './Logotype.styles';
import { ImageBackground, ImageSourcePropType } from 'react-native';

export namespace Logotype {
    export interface Props {
        size: logoTypes;
        noText?: boolean;
    }

    export interface State {
        imageUri: ImageSourcePropType;
    }
}

export class Logotype extends React.Component<Logotype.Props, Logotype.State> {
    public static defaultProps:Partial<Logotype.Props> = {
        size: logoTypes.MEDIUM,
    };

    constructor(props: Logotype.Props) {
        super(props);

        this.state = {
            imageUri: !this.props.noText ?
                require('../../../../assets/images/logotype.png') :
                require('../../../../assets/images/logotype_notext.png'),
        };
    }

    public render() {
        const { size } = this.props;
        const { imageUri } = this.state;

        return (
            <ThemeProvider theme={ { size } }>
                <LogoWrapper>
                    <Image source={ imageUri } />
                </LogoWrapper>
            </ThemeProvider>
        );
    }
}
