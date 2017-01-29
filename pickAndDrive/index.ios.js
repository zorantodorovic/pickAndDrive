import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';
import Login from './app/Login';
import Home from './app/Home';

// import Listings from './app/Listings';
// import RecordsListings from './app/RecordsListings';

export default class pickAndDrive extends Component {

    constructor(props) {
        super(props);
    }


    renderScene(route, navigator) {
        switch(route.name) {
            case 'login':
                return <Login navigator={navigator} {...route.passProps}/>
                break;
            case 'home':
                return <Home navigator={navigator} {...route.passProps}/>
                break;
            // case 'listings':
            //     return <Listings navigator={navigator} {...route.passProps}/>
            //     break;
            // case 'records':
            //     return <RecordsListings navigator={navigator} {...route.passProps}/>
            //     break;
            default:
                return <Login navigator={navigator} {...route.passProps}/>
        }
    }
    

    render() {
        return (
            <Navigator
                ref={'nav'}
                style={{flex: 1}}
                initialRoute={{ name: 'login' }}
                renderScene={ this.renderScene.bind(this) } />
        );
    }
}


AppRegistry.registerComponent('pickAndDrive', () => pickAndDrive);