import React from 'react';
import { Platform, View } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
import { IAuth } from '../../models/Authentication';
import { connect } from '../../shared/types/ReduxConnect';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Status, StatusWrapper } from './Map.styles';
import { Logger } from '../../utils/Logger';
import { change, FormStateMap } from 'redux-form';
import { IMap } from '../../models/Map';
import { RootState } from '../../modules';
import { MapActions } from '../../modules/Map/actions';
import { Action } from 'redux-actions';
import { MapSaga } from '../../modules/Map/sagas';
import { coords } from '../../models/Marker';

export namespace Map {
    export interface Props {
        auth: IAuth;
        map: IMap;
        forms: FormStateMap;
        actions?: mapActions;
    }

    export interface State {
        location?: Location.LocationData;
        errorMessage: string;
        address?: string;
    }

    export interface NavigationOptions {
        header:any;
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
    (state: RootState):Pick<Map.Props, 'auth'|'map'|'forms'> => ({
        auth: state.auth,
        forms: state.form,
        map: state.map,
    }),
    (dispatch:Dispatch):Pick<Map.Props, 'actions'> => ({
        actions: bindActionCreators({
            initMap:(action) => MapActions.initMap(action),
            updateForm: (form, field, value, touch, persistentSubmitErrors) =>
                change(form, field, value, touch, persistentSubmitErrors),
        }, dispatch),
    }),
)

export class Map extends React.Component<Map.Props & NavigationTransitionProps, Map.State> {
    static navigationOptions:Map.NavigationOptions = {
        header: null,
    };

    public state: Map.State = {
        errorMessage: '',
        location: undefined,
        address: undefined,
    };

    componentDidMount(): void {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync()
                .then(res => this._parseAddressAsync(res));

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

        let location = await Location.getCurrentPositionAsync({});
        this.initMap({ longitude: location.coords.longitude, latitude: location.coords.latitude });
        this.setState({ location });

        return location;
    };

    private _parseAddressAsync = async (location?: Location.LocationData) => {
        const { location:defaultLocation } = this.state;
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
    }

    public render() {
        const {
            map: { points },
            navigation: { navigate, state: { params } },
            actions,
        }  = this.props;
        const { location, address } = this.state;

        return  (
            <View>
                {
                    location && location.coords && <MapView
                        style={ { width: '100%', height: '100%' } }
                        onRegionChangeComplete={ (...args:any) => {} }
                        onPress={ (evt:Event) => {} }
                        initialRegion={ {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: .1,
                            longitudeDelta: .1,
                        } }
                        onRegionChange={ (...args:any) => {} }>
                        {
                            <>
                                <Marker
                                    title='You are here!'
                                    coordinate={ location.coords }/>
                                {
                                    points.length ?
                                        points.map((point, index) => point.coords.latitude &&
                                       <Marker
                                           key={ index }
                                           title={ point.meta.title }
                                           description={ point.meta.description }
                                           coordinate={ point.coords }/>) : <></>
                                }
                            </>
                        }
                    </MapView>
                }
                {
                    address &&
                        <StatusWrapper>
                            <Status>
                                { address }
                            </Status>
                        </StatusWrapper>
                }
            </View>
        );
    }
}
