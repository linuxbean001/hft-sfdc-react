import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";
import './mapLocation.css';
class MapLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationAddress: this.props.match.params,
            latitute: '',
            longitute: ''
        }
    }

    componentWillMount() {
        Geocode.setApiKey('AIzaSyCEcOSkNS-yyGj5K8BMVgHhDTvX8BXhoEQ');
        Geocode.enableDebug();
        Geocode.fromAddress(this.state.locationAddress).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    latitute: lat,
                    longitute: lng
                });
            },
            error => {
                console.error("error", error);
            }
        );
    }

    render() {
        return (
            <div>
                {this.state.latitute ? <Map className="map" google={this.props.google} zoom={14}
                    initialCenter={{
                        lat: this.state.latitute,
                        lng: this.state.longitute
                    }}
                >

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                </Map> : ""}

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAlgWenzSnwBYRvvdGkXvR_LP4uizYZChc'
})(MapLocation)
