import * as React from 'react';
import {
    IndicatorContainer,
    InfoContainer,
    InfoSection,
    InfoSectionHeader,
    InfoSectionText
} from './DevIndicator.styles';
import { MaterialIcons } from 'expo-vector-icons';
import global, { MonoText } from '../../../shared/styles/global.styles';
import getEnvVars, { Environment } from '../../../utils/Environments';
import { RootState } from '../../../modules';

export namespace DevIndicator {
    export interface Props {
        auth?: RootState.AuthState;
    }
    export interface State {
        showInfo: boolean;
    }
}

export class DevIndicator extends React.Component<DevIndicator.Props, DevIndicator.State> {
    protected _ENV = getEnvVars();

    public state: DevIndicator.State = {
        showInfo: false,
    };

    private handleShowInfo = () => {
        const { showInfo } = this.state;

        this.setState({
            showInfo: !showInfo,
        });
    };

    public render() {
        const { showInfo } = this.state;
        const { auth } = this.props;

        return (
            <>
                <IndicatorContainer
                    onPress={ this.handleShowInfo }
                    onLongPress={ this.handleShowInfo }>
                    <MaterialIcons name='developer-mode' size={ 28 } color={ global.colours.dark } />
                </IndicatorContainer>
                {
                    showInfo &&
                    <InfoContainer>
                        <InfoSectionHeader>
                            Debug info
                        </InfoSectionHeader>
                        <InfoSection>
                            <InfoSectionText>
                                Env Variables
                            </InfoSectionText>
                            {
                                Object.keys(this._ENV).map((key, index) => (
                                    <MonoText key={ index }>
                                        { key }: { this._ENV[ key as Environment.Variables ] }
                                    </MonoText>
                                ))
                            }
                        </InfoSection>
                        <InfoSection>
                            <InfoSectionText>
                                Authentication status
                            </InfoSectionText>
                            <MonoText>
                                Current User: { auth && auth.user && auth.user.name || 'Guest' }
                            </MonoText>
                            <MonoText>
                                Status: { auth && auth.status && auth.status.type || 'Unknown' }
                            </MonoText>
                        </InfoSection>
                    </InfoContainer>
                }
            </>
        );
    }
}
