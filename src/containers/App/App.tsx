import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { styles } from './App.styles';
import { RootState } from '../../modules';
import { Logger } from '../../utils/Logger';
import { bindActionCreators, Dispatch } from 'redux';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Platform, StatusBar, View } from 'react-native';
import { connect } from '../../shared/types/ReduxConnect';
import { StorageManager } from '../../utils/StorageManager';
import { createAppNavigation } from '../../navigation/AppNavigator';
import { AuthenticationActions } from '../../modules/Authentication/actions';

export namespace App {
    export interface Props {
        skipLoadingScreen?:boolean;
        isSignedIn?:boolean|null;
        actions?: Actions;
    }

    export interface State {
        devShowMore?:boolean;
        isLoadingComplete:boolean;
    }

    export type Actions = {
        isLoggedIn:(payload?: {token: string}) => void;
    };
}

@connect(
    (state:RootState):Pick<App.Props, 'isSignedIn'> => ({
        isSignedIn: !!state.auth.token,
    }),
    (dispatch:Dispatch):Pick<App.Props, 'actions'> => ({
        actions: bindActionCreators({
            isLoggedIn: (action) => AuthenticationActions.isLoggedIn(action),
        }, dispatch),
    }),
)

export class App extends React.Component<App.Props, App.State> {
    public state:App.State = {
        isLoadingComplete: false,
        devShowMore: __DEV__ ? false : undefined,
    };

    protected _handleIsLoggedIn = ():Promise<any> => new Promise(async (resolve, reject) => {
        try {
            const { actions } = this.props;
            const currentToken = await StorageManager.getToken();

            if(actions && currentToken) {
                const _RES = await actions.isLoggedIn({
                    token: currentToken,
                });

                return resolve(_RES);
            } else {
                return reject(null);
            }
        } catch (e) {
            return reject(null);
        }
    });
    protected _handleAuthTokens = async (token:string|null):Promise<string|void> => {
        try {
            const current = await StorageManager.getToken();
            if (token !== null && token !== current) {
                Logger.log(
                    'App Initializer: Successfully Retrieved User Token',
                    { current },
                    Logger.STYLE.INFO,
                );

                await StorageManager.setToken(token);

                return token;
            }
        } catch (err) {
            Logger.log(
                'App Initializer: Could Not Retrieve User Token',
                { err },
                Logger.STYLE.WARN,
            );
        }
    };
    protected _handleCacheImages = async () => {
        const images: number[] = [
            require('../../../assets/images/app_bg.png'),
            require('../../../assets/images/app_icon.png'),
            require('../../../assets/images/logotype.png'),
            require('../../../assets/images/logotype_notext.png'),
            require('../../../assets/images/splash_screen.png'),
        ];

        if(images.length) {
            return images.map(async image => await Asset.loadAsync(image));
        } else {
            return Promise.reject('No images present for caching');
        }
    };
    protected _loadResourcesAsync = async ():Promise<void> => {
        try {
            await this._handleCacheImages(); // <== Uncomment if you're caching images
            await Font.loadAsync({
                // Loads Ionicons icon-set
                ...Ionicons.font,
                ...Entypo.font,
                // Loads Project Specific fonts
                'Raleway_Regular': require('../../../assets/fonts/Raleway/Raleway-Regular.ttf'),
                'Raleway_Medium': require('../../../assets/fonts/Raleway/Raleway-Medium.ttf'),
                'Raleway_Bold': require('../../../assets/fonts/Raleway/Raleway-Bold.ttf'),
                'Raleway_Black': require('../../../assets/fonts/Raleway/Raleway-Black.ttf'),
            });

            Logger.log(
                'App Initializer: Assets & Fonts Successfully Loaded',
                '',
                Logger.STYLE.INFO,
            );
    } catch (e) {
            Logger.log(
                'App Initializer: Failed Loading Static Assets',
                e,
                Logger.STYLE.INFO,
            );
        }
    };
    protected _checkAuthenticate = async (): Promise<void> => {
        try {
            const { actions } = this.props;
            const res = await this._handleIsLoggedIn();

            if(res && actions) {
                this._handleAuthTokens(res && res.token);

                Logger.log(
                    'App Initializer: User Session Restored',
                    '',
                    Logger.STYLE.INFO,
                );
            }
        } catch (err) {
            Logger.log(
                'App Initializer: Failed Restoring User Session',
                err,
                Logger.STYLE.INFO,
            );
        }
    };
    protected _initAppAsync = async (): Promise<void> => {
        try {
            await Promise.all([
                this._checkAuthenticate(),
                this._loadResourcesAsync(),
            ]);

            Logger.log(
                'App Initializer: Successfully initialized the application',
                '',
                Logger.STYLE.INFO,
            );

            return;
        } catch (err) {
            Logger.log(
                'App Initializer: Failed initialising the application',
                err,
                Logger.STYLE.INFO,
            );

            return;
        }
    };
    protected _handleLoadingError = (error:Error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        Logger.log(
            'App Initializer: Loading Application Failed, Try Again',
            {error},
            Logger.STYLE.WARN,
        );
    };
    protected _renderAuthenticatedView = ():React.ReactNode => {
        const { isSignedIn } = this.props;
        const AppNavigator = createAppNavigation(isSignedIn as boolean|undefined);

        Logger.log(
            `App Initializer: Creating App Navigation for a ${isSignedIn ? 'returning' : 'guest'} user`,
            { isSignedIn, AppNavigator },
            Logger.STYLE.INFO,
        );

        return (
            <View style={ styles.container }>
                { Platform.OS === 'ios' && <StatusBar barStyle='default'/> }
                <AppNavigator/>
            </View>
        );
    };
    protected _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    public render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={ async () => await this._initAppAsync() }
                    onError={ this._handleLoadingError }
                    onFinish={ this._handleFinishLoading }>
                </AppLoading>
            );
        }
        else return this._renderAuthenticatedView();
    }
}
