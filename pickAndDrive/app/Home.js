'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';

var windowWidth = Dimensions.get('window').width;

import {
	StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

class Home extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	renderNavBar() {
        return (
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}>Home</Text>
            </View>
        );
    }

    componentDidMount() {
    }

    getAllRecords() {
        var arr = [];
        this.setState({ loading: true });
        fetch(`http://${this.props.ipAddress}:8080/rest/records`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.props.basicToken}`,
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
            responseData.forEach( function(element, index) {
                arr.push(element.dateTime);
            });
            this.setState({ loading: false });
            this.props.navigator.push({
                name: 'records',
                passProps: {
                    title: 'Records',
                    data: responseData
                }
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    getAllUsers() {
        var arr = [];
        this.setState({ loading: true });
        fetch(`http://${this.props.ipAddress}:8080/rest/users`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.props.basicToken}`,
          }
          // body: JSON.stringify({
          // })
        })
        // .then((response) => {
        //     console.log(response);
        //     // response.text();
        //     response.json();
        // })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.forEach( function(element, index) {
                arr.push(element.username);
            });
            this.setState({ loading: false });
            this.props.navigator.push({
                name: 'listings',
                passProps: {
                    title: 'Users',
                    data: arr
                }
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    getAllSinks() {
        var arr = [];
        this.setState({ loading: true });
        fetch(`http://${this.props.ipAddress}:8080/rest/sinks?userId=1`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.props.basicToken}`,
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.forEach( function(element, index) {
                arr.push(element.uri);
            });
            this.setState({ loading: false });
            console.log(responseJson);
            this.props.navigator.push({
                name: 'listings',
                passProps: {
                    title: 'Sinks',
                    data: arr
                }
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    getAllSensors() {
        var arr = [];
        this.setState({ loading: true });
        fetch(`http://${this.props.ipAddress}:8080/rest/sensors`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.props.basicToken}`,
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.forEach( function(element, index) {
                arr.push(element.ipAddress);
            });
            this.setState({ loading: false });
            this.props.navigator.push({
                name: 'listings',
                passProps: {
                    title: 'Sensors',
                    data: arr
                }
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    renderLoadingView() {
        return (
            <View style={styles.mainWrapper}>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>Home</Text>
                </View>
                <View style={styles.formWrapper}>
                    <ActivityIndicator size={"large"}/>
                </View>
            </View>
        );
    }

  	render() {
        if (this.state.loading) {
            return this.renderLoadingView();
        }

	   	return (
	      	<View style={styles.mainWrapper}>
		      	{this.renderNavBar()}
		      	<View style={styles.formWrapper}>
		        	<TouchableHighlight
                        onPress={this.getAllRecords.bind(this)}
                        underlayColor='white'>
                        <View style={styles.button}>
                            <Text>Get all records</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.getAllSinks.bind(this)}
                        underlayColor='white'>
                        <View style={styles.button}>
                            <Text>Get all sinks</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.getAllSensors.bind(this)}
                        underlayColor='white'>
                        <View style={styles.button}>
                            <Text>Get all sensors</Text>
                        </View>
                    </TouchableHighlight>
		      	</View>
		    </View>
		);
  	}
}

const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		alignItems: 'center'
	},
    toolbar: {
        backgroundColor:'#006CB2',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingBottom: 14,
        height: 64,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbarButtonWrapper: {
        flex: 1,
        width: 44, 
        height: 34,
        paddingRight: 20,
        justifyContent: 'flex-start',
    },
    toolbarLeftButton:{
        width: 22, 
        height: 22,
        marginLeft: 15,
        marginTop: 14,         
        flex: 1,
        backgroundColor: 'transparent',
        resizeMode: 'contain'
    },
    toolbarButton:{
        width: 22, 
        height: 22,      
        flex: 1,
        backgroundColor: 'transparent'
    },
    toolbarTitle:{
        color:'#fff',
        position: 'absolute',
        paddingBottom: 4,
        top: 32,
        left: 50,
        right: 50,
        textAlign:'center',
        fontWeight: '600',
        fontSize: 17,   
    },
    formWrapper: {
    	marginTop: 100,
    	flex: 1,
    	alignItems: 'center'
    },
    button: {
    	backgroundColor: 'gray',
    	width: 100,
    	height: 50,
    	alignItems: 'center',
    	justifyContent: 'center',
    	borderRadius: 2,
    	marginTop: 15
    }
});


export default Home;