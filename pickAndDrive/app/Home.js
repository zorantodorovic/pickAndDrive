'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

import {
	StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    DatePickerIOS,
    Picker
} from 'react-native';

class Home extends Component {

	constructor(props) {
	   super(props);
	   this.state = {
            dateFrom: new Date(),
            showFirstDatePicker: false,
            dateTo: new Date(),
            showSecondDatePicker: false,
            city: 'Zagreb',
            showcityPicker: false,
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
        };
	}

	renderNavBar() {
        return (
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}>Home</Text>
            </View>
        );
    }


    getAllSensors() {
        
    this.props.navigator.push({
        name: 'listings',
        passProps: {
            title: 'Cars',
            data: this.props.data
        }
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

        var showFirstDatePicker = this.state.showFirstDatePicker ?
            <DatePickerIOS
                style={styles.datepicker}
                date={this.state.dateFrom} onDateChange={(date)=>this.setState({dateFrom: date})}
                mode="date"/> : <View />
        var showSecondDatePicker = this.state.showSecondDatePicker ?
            <DatePickerIOS
                style={styles.datepicker}
                date={this.state.dateTo} onDateChange={(date)=>this.setState({dateTo: date})}
                mode="date"/> : <View />
        var cityPicker = this.state.showcityPicker ? 
            <Picker
                style={styles.datepicker}
                selectedValue={this.state.city}
                onValueChange={(city) => this.setState({city: city})}>
              <Picker.Item label="Zagreb" value="Zagreb" />
              <Picker.Item label="Split" value="Split" />
              <Picker.Item label="Osijek" value="Osijek" />
              <Picker.Item label="Rijeka" value="Rijeka" />
            </Picker> : <View />


	   	return (
	      	<View style={styles.mainWrapper}>
		      	{this.renderNavBar()}
                <Image source={require('./img/background.jpg')} style={styles.backgroundImage}>
    		      	<View style={styles.formWrapper}>
                        <Text style={{color:'white', paddingBottom: 10}}>Date from:</Text>
                        <TouchableOpacity 
                            onPress={() => this.setState({showFirstDatePicker: !this.state.showFirstDatePicker})}>
                            <Text style={styles.input}>{this.state.dateFrom.toISOString().slice(0, 10)}</Text>
                        </TouchableOpacity>
                        {showFirstDatePicker}
                        <Text style={{color:'white', paddingBottom: 10, paddingTop: 15}}>Date to:</Text>
                        <TouchableOpacity 
                            onPress={() => this.setState({showSecondDatePicker: !this.state.showSecondDatePicker})}>
                            <Text style={styles.input}>{this.state.dateTo.toISOString().slice(0, 10)}</Text>
                        </TouchableOpacity>
                         {showSecondDatePicker}
                         <Text style={{color:'white', paddingBottom: 10, paddingTop: 15}}>City:</Text>
                         <TouchableOpacity 
                            onPress={() => this.setState({showcityPicker: !this.state.showcityPicker})}>
                            <Text style={styles.input}>{this.state.city}</Text>
                        </TouchableOpacity>
                        {cityPicker}
                        <TouchableHighlight
                            onPress={this.getAllSensors.bind(this)}
                            underlayColor='white'>
                            <View style={styles.button}>
                                <Text>Submit</Text>
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
		alignItems: 'center'
	},
    backgroundImage: {
        zIndex: 1,
        marginTop: 64,
        resizeMode: 'cover',
        width: windowWidth,
        height: windowHeight
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
    	marginTop: 15,
    	flex: 1,
        paddingLeft: 10
    	// alignItems: 'center',
        // backgroundColor: 'red'
    },
    input: {
        width: windowWidth - 20,
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        padding: 10,
        borderRadius: 4,
        justifyContent: 'center'
    },
    datepicker: {
        marginTop: 15,
        height: 200,
        width: windowWidth - 20,
        backgroundColor: 'white',
        borderRadius: 2
    },
    button: {
    	backgroundColor: 'gray',
    	width: windowWidth - 20,
    	height: 50,
    	alignItems: 'center',
    	justifyContent: 'center',
    	borderRadius: 2,
    	marginTop: 15,
    }
});


export default Home;