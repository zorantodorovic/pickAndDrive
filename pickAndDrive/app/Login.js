'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';

var windowWidth = Dimensions.get('window').width;
// var serverIpAddress = "192.168.0.19";
var serverIpAddress = "172.20.10.5";

import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

class Login extends Component {

	constructor(props) {
	  	super(props);
	  	this.state = {
	  		username: "",
	  		password: "",
            loading: false
	  	};
	}

	renderNavBar() {
        return (
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}>Login</Text>
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.mainWrapper}>
                <View style={styles.toolbar}>
                    <Text style={styles.toolbarTitle}>Login</Text>
                </View>
                <View style={styles.formWrapper}>
                    <ActivityIndicator size={"large"}/>
                </View>
            </View>
        );
    }

    toBase64() {
        var string = "admin:admin";
        // var string = `${this.state.username}:${this.state.password}`;
        // var bs64 = btoa(string);
        // return bs64;
        return null;
    }

    returnMockData() {
        let json = {
            availableCars: [
                {
                   id: 1,
                   marka: "Fiat",
                   vrsta: "Gradski automobil",
                   cijena: 20,
                   opis: "bomba od auta"
                },
                {
                    id: 2,
                    marka: "Opel",
                    vrsta: "Gradski automobil",
                    cijena: 20,
                    opis: "bomba od auta"
                }
            ]
        };

        return json;
    }

    login() {
        var basicToken = this.toBase64();
        // console.log(basicToken);
        this.setState({ loading: true });
        let data = this.returnMockData();
        setTimeout(() => {
            // this.props.navigator.push({
            //     name: 'listings',
            //     passProps: {
            //         title: 'Cars',
            //         data: data.availableCars
            //     }
            // });
            this.props.navigator.push({
                name: 'home',
                passProps: {
                    title: 'Pick date',
                    data: data.availableCars
                }
            });
        }, 1000);

        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    }

  	render() {
        if (this.state.loading) {
            return this.renderLoadingView();
        }

        console.log(this.returnMockData());

	    return (
	      	<View style={styles.mainWrapper}>
		      	{this.renderNavBar()}
                <Image source={require('./img/background.jpg')} style={styles.backgroundImage}>
    		      	<View style={styles.formWrapper}>
    		      		<TextInput 
    			      		style={{width: windowWidth - 20, height: 40, borderColor: 'white', borderWidth: 1, color: 'white',paddingLeft: 15, borderRadius: 4}}
    		        		onChangeText={(text) => this.setState({username: text})}
    		        		value={this.state.username}
                            placeholder={"Username"}
                            placeholderTextColor="white"
                            autoCapitalize={"none"}
    		        	/>
    		        	<TextInput 
    		        		secureTextEntry={true}
    			      		style={{width: windowWidth - 20, height: 40, borderColor: 'white', borderWidth: 1, color: 'white',paddingLeft: 15, marginTop: 15, borderRadius: 4}}
    		        		onChangeText={(text) => this.setState({password: text})}
                            placeholder={"Password"}
                            placeholderTextColor="white"
    		        		value={this.state.password}
    		        	/>
    		        	<TouchableHighlight
    						onPress={this.login.bind(this)}
    						underlayColor='white'>
    						<View style={styles.button}>
    							<Text>Login</Text>
    						</View>
    					</TouchableHighlight>
    		      	</View>
                </Image>
		    </View>
		);
  	}
}

const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		alignItems: 'center',
        zIndex: 2
	},
    backgroundImage: {
        zIndex: 1,
        marginTop: 64,
        resizeMode: 'cover',
        width: null,
        height: null
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
    	alignItems: 'center',
        zIndex: 3,
        padding: 10
    },
    button: {
    	backgroundColor: '#d0d0d0',
    	width: 100,
    	height: 45,
    	alignItems: 'center',
    	justifyContent: 'center',
        borderRadius: 4,
    	marginTop: 15
    }
});


export default Login;