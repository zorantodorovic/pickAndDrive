'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';

var windowWidth = Dimensions.get('window').width;

import {
	StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    ListView,
    Alert
} from 'react-native';

class Listings extends Component {

	constructor(props) {
	  	super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    	this.state = {
      		dataSource: ds.cloneWithRows(this.props.data),
    	};
	}

	handleBackButton() {
		this.props.navigator.pop();
	}

	renderNavBar() {
        return (
            <View style={styles.toolbar}>
            	<TouchableHighlight
            		underlayColor={"transparent"}
            		style={styles.toolbarLeftButtonWrapper}
            		onPress={this.handleBackButton.bind(this)}>
            		<Text style={styles.toolbarLeftButton}>Back</Text>
            	</TouchableHighlight>
                <Text style={styles.toolbarTitle}>{this.props.title}</Text>
            </View>
        );

        // return (
        //     <View style={styles.toolbar}>
        //         <Text style={styles.toolbarTitle}>{this.props.title}</Text>
        //     </View>
        // );
    }

    showAlert() {
        Alert.alert(
          'Bravo',
          'Odlicno',
          [
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
    }

    renderRow(data) {
    	return (
	          <View style={styles.row}>
                <View style={styles.rowInner}>
                    <Image source={require('./img/opel.jpg')} style={styles.carImage}/>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>
	                       Model: {data.marka}
	                    </Text>
                        <Text style={styles.text}>
                           {data.cijena} HRK
                        </Text>
                        <Text style={styles.text}>
                           Tip: {data.vrsta}
                        </Text>
                        <Text style={styles.text}>
                           {data.opis}
                        </Text>
                   </View>
                </View>
                <TouchableHighlight
                     style={styles.buttonWrapper}
                     onPress={this.showAlert.bind(this)}
                     underlayColor='white'>
                     <View style={styles.button}>
                         <Text style={styles.buttonText}>Rezerviraj</Text>
                     </View>
                 </TouchableHighlight>
	       </View>
	    );
    }

  	render() {
	   	return (
	      	<View style={styles.mainWrapper}>
		      	{this.renderNavBar()}
                <Image source={require('./img/background.jpg')} style={styles.backgroundImage}>
    		      	<ListView
    		      	    dataSource={this.state.dataSource}
    	      	        renderRow={this.renderRow.bind(this)}
    	      	        style={styles.listView}
    		      	/>
                </Image>
		    </View>
		);
  	}
}

const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		// alignItems: 'center'
	},
    backgroundImage: {
        zIndex: 1,
        flex: 1,
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
        width: windowWidth,
        paddingBottom: 14,
        height: 64,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbarButtonWrapper: {
        width: 44, 
        height: 34,
        marginTop: 10,
    },
    toolbarLeftButton:{
        width: 50, 
        height: 22,
        marginLeft: 10,
        marginTop: 35,         
        backgroundColor: 'transparent',
        color: 'white'
    },
    toolbarTitle:{
    	flex: 1,
        color:'#fff',
        paddingBottom: 4,
        marginRight: 55,
        marginTop: 32,
        textAlign:'center',
        fontWeight: '600',
        fontSize: 17,   
    },
    listView: {
    	marginTop: 5,
    	width: windowWidth,
    	height: 500,
    	flex: 1,
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
        marginTop: 15,
        alignItems: 'center',
        padding: 10
    },
    rowInner: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWrapper: {
    	flex: 1,
    	padding: 10,
        flexDirection: 'column'
    },
    text: {
        flex: 1,
        paddingBottom: 5,
        paddingLeft: 10,
        color: "black"
    },
    carImage: {
        flex: 1,
        width: 200,
        height: 100,
        resizeMode: 'contain'
    },
    buttonWrapper: {
        flex: 1,
        width: windowWidth-20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    button: {
        flex: 1,
        height: 35,
        width: windowWidth-20,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});


export default Listings;