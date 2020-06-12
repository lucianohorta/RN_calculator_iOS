require("./../libs/swisscalc.lib.format.js");
require("./../libs/swisscalc.lib.operator.js");
require("./../libs/swisscalc.lib.operatorCache.js");
require("./../libs/swisscalc.lib.shuntingYard.js");
require("./../libs/swisscalc.display.numericDisplay.js");
require("./../libs/swisscalc.display.memoryDisplay.js");
require("./../libs/swisscalc.calc.calculator.js");

import React from "react";
import { StyleSheet, PanResponder, View, Text, Dimensions } from "react-native";
import { CalcButton, CalcDisplay } from "./../components";

import EStyleSheet from 'react-native-extended-stylesheet';

export class Sup extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize: 10, lineHeight: 20}}>2</Text><Text style={{fontSize: 8, lineHeight: 10}}>nd</Text>
      </View>
    );
  }
}

export default class CalculatorScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      orientation: "portrait"
    };

    // Init calculator...
    this.oc = global.swisscalc.lib.operatorCache;
    this.sy = global.swisscalc.lib.shuntingYard.prototype.addOpenParen;
    this.calc = new global.swisscalc.calc.calculator();

    // Listen for orientation...
    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window");
      var orientation = (width > height) ? "landscape" : "portrait";
      this.setState({ orientation: orientation });
    });

    // Initialize PanResponder... 
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackSpacePress();
        }
        else if (Math.abs(gestureState.dy) >= 50) {
          this.calc.clear();
          this.setState({ display: this.calc.getMainDisplay() });
        }
      },
    });
    

  }


// Occurs when digit is pressed...
  onDigitPress = (digit) => {
    this.calc.addDigit(digit);
    this.setState({ display: this.calc.getMainDisplay() });
  }

// Occurs when binary operators are pressed...  +/-/÷/x
  onBinaryOperatorPress = (operator) => {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

// Occurs when a unary operator is pressed  
  onUnaryOperatorPress = (operator) => {
    this.calc.addUnaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

// Occurs when a nullary operator is pressed
  onNullaryOperatorPress = (operator) => {
    this.calc.addNullaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

// Occurs when a parenthesis is opened  - Ex: ( 
  onaddOpenParenPress = () => {
    this.calc.openParen();
    this.setState({ display: this.calc.getMainDisplay() });
  }  

// Occurs when a parenthesis is closed  - Ex: )
  onaddCloseParenPress = () => {
    this.calc.closeParen();
    this.setState({ display: this.calc.getMainDisplay() });
  }  
// Occurs when mc is pressed
  memoryClear = () => {
    this.calc.memoryClear();
    this.setState({ display: this.calc.getMainDisplay() });
  }  

// Occurs when m+ is pressed
  memoryPlus = () => {
  this.calc.memoryClear();
  this.setState({ display: this.calc.getMainDisplay() });
}    

// Occurs when m- is pressed
  memoryMinus = () => {
  this.calc.memoryClear();
  this.setState({ display: this.calc.getMainDisplay() });
}  

// Occurs when mr is pressed
  memoryRecall = () => {
  this.calc.memoryRecall();
  this.setState({ display: this.calc.getMainDisplay() });
}  

// Occurs when clear is pressed...
  onClearPress = () => { 
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  }

// Occurs when backspace is pressed...  
  onBackSpacePress = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  }

// Occurs when +/- is pressed...
  onPlusMinusPress = () => {
    this.calc.negate();
    this.setState({ display: this.calc.getMainDisplay() });     
  }

// = pressed... 
  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });   
  }
  

  renderPortrait() {
    return (
      <View style={{flex:1}}>

        <View style={styles.displayContainer}   {...this.PanResponder.panHandlers} >
            <CalcDisplay display={this.state.display} />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <CalcButton onPress={this.onClearPress} title="C" color="black" backgroundColor="#A5A5A5" style={styles.buttonStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="+/-" color="black" backgroundColor="#A5A5A5" style={styles.buttonStyle} />
              <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="%" color="black" backgroundColor="#A5A5A5" style={styles.buttonStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="÷" color="white" backgroundColor="#FF9E0B" style={[styles.buttonStyle]} />
            </View>

            <View style={styles.buttonRow}>
              <CalcButton onPress={() => { this.onDigitPress("7") }} title="7" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onDigitPress("8") }} title="8" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onDigitPress("9") }} title="9" color="white" backgroundColor="#545555" /> 
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title="x" color="white" backgroundColor="#FF9E0B" />
            </View> 
  
            <View style={styles.buttonRow}>
              <CalcButton onPress={() => { this.onDigitPress("4") }} title="4" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onDigitPress("5") }} title="5" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onDigitPress("6") }} title="6" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.SubtractionOperator) }} title="-" color="white" backgroundColor="#FF9E0B" />
            </View>

            <View style={styles.buttonRow}> 
              <CalcButton onPress={() => { this.onDigitPress("1") }} title="1" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onDigitPress("2") }} title="2" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onDigitPress("3") }} title="3" color="white" backgroundColor="#545555" />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.AdditionOperator) }} title="+" color="white" backgroundColor="#FF9E0B" />
            </View>

            <View style={styles.buttonRow}>
              <CalcButton onPress={() => { this.onDigitPress("0") }} title="0" color="white" backgroundColor="#545555" style={{flex: 2}}/>
              <CalcButton onPress={() => { this.onDigitPress(".") }} title="." color="white" backgroundColor="#545555" style={{flex: 1}}/>
              <CalcButton onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#FF9E0B" style={{flex: 1}}/>
            </View> 
          </View>

        </View>
    );
  }

  renderLandscape() {
    return (
      <View style={{flex:1}}>
          <View style={styles2.displayContainerLand}   {...this.PanResponder.panHandlers} >
            <CalcDisplay display={this.state.display} />
          </View>

          <View style={styles2.buttonContainerLand}>
            <View style={styles2.buttonRowLand}>
              <CalcButton onPress={() => { this.onaddOpenParenPress(this.oc.openParen) }} title="(" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onaddCloseParenPress(this.oc.closeParen) }} title=")" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.memoryClear(this.oc.memoryClear) }} title="mc" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.memoryPlus(this.oc.memoryPlus) }} title="m+" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.memoryMinus(this.oc.memoryMinus) }} title="m-" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.memoryRecall(this.oc.memoryRecall) }} title="mr" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onClearPress} title="C" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="+/-" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="%" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="÷" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
            </View>

            <View style={styles2.buttonRowLand}>
            <CalcButton onPress={this.onClearPress} title="2nd" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="x²" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="x³" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="xy" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onClearPress} title="ex" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="10x" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("7") }} title="7" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("8") }} title="8" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("9") }} title="9" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title="x" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
            </View> 
  
            <View style={styles2.buttonRowLand}>
            <CalcButton onPress={this.onClearPress} title="1/x" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="2radx" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="3radx" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="yradx" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onClearPress} title="ln" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="log10" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("4") }} title="4" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("5") }} title="5" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("6") }} title="6" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.SubtractionOperator) }} title="-" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
            </View>

            <View style={styles2.buttonRowLand}> 
              <CalcButton onPress={this.onClearPress} title="x!" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="sin" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="cos" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="tan" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onClearPress} title="e" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="EE" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("1") }} title="1" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("2") }} title="2" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("3") }} title="3" color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.AdditionOperator) }} title="+" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
            </View>

            <View style={styles2.buttonRowLand}>
            <CalcButton onPress={this.onClearPress} title="Rad" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="sinh" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="cosh" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="tanh" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onClearPress} title="pi" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onPlusMinusPress} title="Rand" color="black" backgroundColor="#A5A5A5" style={styles2.buttonLandStyle} />
              <CalcButton onPress={() => { this.onDigitPress("0") }} title="0" color="white" backgroundColor="#545555" style={{width: 130, height:44}}/>
              <CalcButton onPress={() => { this.onDigitPress(".") }} title="." color="white" backgroundColor="#545555" style={styles2.buttonLandStyle} />
              <CalcButton onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#FF9E0B" style={styles2.buttonLandStyle} />
            </View> 
          </View>
      </View>
    )
  }

  render() {
    var view = (this.state.orientation == "portrait")
      ? this.renderPortrait()
      : this.renderLandscape()

    return (
      <View style={styles.container}>
        { view }   
      </View>
    );  
  }
}


// portrait style:
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", flexShrink: 1  },
  displayContainer: { flex: 1, justifyContent: "flex-end", flexShrink: 1, flexWrap: "nowrap" },
  buttonContainer: { paddingBottom: 20 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginLeft: 24, marginRight: 24 },
  buttonStyle: { fontStyle: "italic"  }
});



// landscape style:
const styles2 = EStyleSheet.create({
  displayContainerLand: { paddingBottom: 0, marginBottom: 0},
  buttonContainerLand: { marginTop: -18 },
  buttonRowLand: { flexDirection: "row", justifyContent: "flex-end", alignContent: "flex-end" },
  buttonLandStyle :{
    width: 54,
    height: 44,
    marginRight: 12,
    fontStyle: "italic"
  }
});
