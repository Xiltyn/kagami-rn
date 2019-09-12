import React from 'react';
import { IAuth } from '../../models/Authentication';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapWrapper, Status, StatusWrapper } from './Map.styles';
import { FormStateMap } from 'redux-form';
import { IMap } from '../../models/Map';
import { MapContainer } from '../../containers/MapContainer/MapContainer';

export namespace Map {
    export interface Props {
        auth: IAuth;
        map: IMap;
        forms: FormStateMap;
        actions?: MapContainer.mapActions;
        address: string;
        width: number;
        height: number;
        location: Location.LocationData;
    }
}

export class Map extends React.Component<Map.Props> {
    public render() {
        const {
            width,
            height,
            address,
            location,
            map: { points },
        }  = this.props;

        return  (
            <MapWrapper>
                <MapView
                    style={ { width, height } }
                    initialRegion={ {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: .1,
                        longitudeDelta: .1,
                    } }>
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
                <StatusWrapper>
                    <Status>
                        { address }
                    </Status>
                </StatusWrapper>
            </MapWrapper>
        );
    }
}
