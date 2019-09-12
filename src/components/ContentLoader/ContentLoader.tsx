import * as React from 'react';
import { LoaderContainer, LoaderMessage, LoaderSpinner } from './ContentLoader.styles';
import { Color } from 'csstype';
import global from '../../shared/styles/global.styles';

export namespace ContentLoader {
    export interface Props {
        message?: string;
        size: number;
        color: Color;
    }
}

export class ContentLoader extends React.Component<ContentLoader.Props> {
    public static defaultProps: Partial<ContentLoader.Props> = {
        size: 80,
        color: global.colours.primary_light,
    };

    public render():React.ReactNode {
        const { message, size, color } = this.props;

        return (
            <LoaderContainer>
                <LoaderSpinner
                    size={ size }
                    color={ color } />
                {
                    message &&
                        <LoaderMessage>
                            { message }
                        </LoaderMessage>
                }
            </LoaderContainer>
        );
    }
}
