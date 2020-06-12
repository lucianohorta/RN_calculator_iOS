import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts = {
    'SFLight': require('../assets/fonts/SFLight.ttf'),
    'SFPro': require('../assets/fonts/SFProDisplay.ttf'),
    'SFSemiBold': require('../assets/fonts/SFSemiBold.ttf'),
    'SFBold': require('../assets/fonts/SFBold.ttf'),
};

export default class CalcButton extends React.Component {

    static defaultProps = {
        onPress: function() { },
        title: "",
        color: "white",
        backgroundColor: "black",
        style: { }
    }

    state = {
        fontsLoaded: false,
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }
  
    render() {
        var bc = this.props.backgroundColor;
        
        if (this.state.fontsLoaded) {
            return (
                <TouchableOpacity onPress={this.props.onPress} 
                style={[styles.container, styles2.containerland, {backgroundColor: bc }, { ...this.props.style }]}>
                    <Text style={[styles.text, styles2.text, { color: this.props.color }]}>{this.props.title}</Text>
                </TouchableOpacity>
            );
        } else {
            return <AppLoading />;
        }
    }
}

const styles = StyleSheet.create({
    container: { 
        alignItems: "center", 
        justifyContent: "center", 
        margin: 5,
        width: 80, 
        height: 80, 
        borderRadius: 40 
    },
    text: { 
        fontSize: 32, 
        fontFamily: 'SFPro'
    },
});

// define extended styles 
const styles2 = EStyleSheet.create({
    '@media (orientation: landscape)': {
        // containerland: {
        //     width: 50, 
        //     height: 50, 
        // },
        text: {
            fontSize: 12,
            fontWeight: "normal"
        }
    }
    // ,
    // '@media (orientation: portrait)': {
    //     text: {
    //         fontSize: 40,
    //         fontWeight: "bold"
    //     }
    // }
  });
