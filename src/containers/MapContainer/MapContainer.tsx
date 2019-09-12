import * as React from 'react';
import { connect } from '../../shared/types/ReduxConnect';
import { RootState } from '../../modules';
import { bindActionCreators, Dispatch } from 'redux';
import { MapActions } from '../../modules/Map/actions';
import { change, FormStateMap } from 'redux-form';
import { IAuth } from '../../models/Authentication';
import { IMap } from '../../models/Map';
import { MapSaga } from '../../modules/Map/sagas';
import { Map } from '../../screens/Map/Map';
import { LayoutEvent, NavigationScreenProps } from 'react-navigation';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { coords } from '../../models/Marker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Logger } from '../../utils/Logger';
import { ScreenWrapper } from '../../components/_layout/ScreenWrapper/ScreenWrapper';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';
import global from '../../shared/styles/global.styles';

export namespace MapContainer {
    export interface Props extends NavigationScreenProps {
        auth: IAuth;
        map: IMap;
        forms: FormStateMap;
        actions?: mapActions;
    }

    export interface State {
        errorMessage: string;
        address?: string;
        location?: Location.LocationData;
        viewSize: {
            width: number;
            height: number;
        };
    }

    export type mapActions = {
        initMap: (payload: {config: MapSaga.MapConfig}) => void;
        updateForm: (
            form: string,
            field: string,
            value: any,
            touch?: boolean,
            persistentSubmitErrors?: boolean,
        ) => void;
    };
}

@connect(
    (state: RootState): Pick<MapContainer.Props, 'auth'|'map'|'forms'> => ({
        auth: state.auth,
        forms: state.form,
        map: state.map,
    }),
    (dispatch:Dispatch):Pick<MapContainer.Props, 'actions'> => ({
        actions: bindActionCreators({
            initMap:(action) => MapActions.initMap(action),
            updateForm: (form, field, value, touch, persistentSubmitErrors) =>
                change(form, field, value, touch, persistentSubmitErrors),
        }, dispatch),
    }),
)
export class MapContainer extends React.Component<MapContainer.Props, MapContainer.State> {
    public state: MapContainer.State = {
        errorMessage: '',
        address: undefined,
        location: undefined,
        viewSize: {
            width: 0,
            height: 0,
        },
    };

    public componentDidMount(): void {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync().then(this._parseAddressAsync);
        }
    }

    private initMap(location: coords): void {
        const { actions } = this.props;
        if(actions) actions.initMap({
            config: {
                location,
                debug: true,
                generateMarkers: true,
            },
        });
    }

    private _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });

            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        this.initMap({ longitude: location.coords.longitude, latitude: location.coords.latitude });
        this.setState({ location });

        return location;
    };

    private _parseAddressAsync = async (location?: Location.LocationData) => {
        const { location: defaultLocation } = this.state;
        const finalLocation = location || defaultLocation;
        const isResultValid = function<T>(data: any): data is T | boolean {
            return !!(data && data.length);
        };

        if(finalLocation) {
            await Location.reverseGeocodeAsync(finalLocation.coords).then(_RES => {
                Logger.log('Parsing address into readable address :: ', {
                    fromCoords: finalLocation.coords,
                    result: _RES,
                    isValid: isResultValid(_RES),
                }, Logger.STYLE.PROCESS);
                const addressObj = _RES[0] as Location.Address;
                const formatted =
                    `${addressObj.street} ${addressObj.name}, ${addressObj.city}, ${addressObj.country}`;

                this.setState({
                    address: formatted,
                });
            }).catch(e => {
                return e as Error;
            });
        }
    };

    private handleSize = (event: LayoutEvent) => {
        const { width, height } = event.nativeEvent.layout;

        this.setState({
            viewSize: {
                width: width,
                height: height,
            },
        });
    };

    public render() {
        const {
            auth,
            map,
            forms,
            actions,
            navigation,
        } = this.props;

        const {
            address,
            location,
            viewSize: { width, height },
        } = this.state;

        return (
            <ScreenWrapper
                navigation={ navigation }
                onLayout={ this.handleSize }>
                {
                    (address && location) ?
                        <Map
                            address={ address }
                            location={ location }
                            auth={ auth }
                            map={ map }
                            forms={ forms }
                            width={ width }
                            height={ height }
                            actions={ actions }/> :
                        <ContentLoader
                            size={ 56 }
                            message='Loading Map...'
                            color={ global.colours.primary_light }/>
                }
            </ScreenWrapper>
        );
    }
}
