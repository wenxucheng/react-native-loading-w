/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import Loading from 'react-native-loading-w';
import Button from 'react-native-button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tip: ''
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <View style={{height: 20, backgroundColor: '#3FB4CF'}} />
        <View style={styles.titlebar}>
          <Text style={{color: 'white'}}>this is a titlebar</Text>
        </View>
        <View style={{padding: 5}}>
          <View style={{flexDirection: 'row'}}>
            {
              this.createButton('show loading', () => {
                this.getLoading().setLoadingTimeout(5000, () => {
                  this.updateTip('the loading is timeout!');
                  this.getLoading().clearLoadingTimeout();
                }).show();
                this.updateTip('');
              })
            }
            {
              this.createButton('penetrable', () => {
                this.getLoading().show(true);
                this.updateTip('this loading is clickable cover the bottom of the view');
              })
            }
            {
              this.createButton('dismiss loading', () => {
                this.getLoading().dismiss();
                this.updateTip('');
              })
            }
          </View>
          <View style={{flexDirection: 'row'}}>
            {
              this.createButton('show loading2', () => {
                this.getLoading2().show('loading2...');
              })
            }
            {
              this.createButton('dismiss loading2', () => {
                this.getLoading2().dismiss();
              })
            }
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#f2f2f2'}} ref={'test'}>
          <Text>this is a test layout</Text>
          <Text>{this.state.tip}</Text>
          <Loading ref={'loading2'} />
        </View>
        <Loading ref={'loading'} text={'Loading...'} />
      </View>
    );
  }

  updateTip(tip) {
    this.setState({
      tip: tip,
    });
  }

  createButton(text, func) {
    return (
      <Button
        containerStyle={styles.btnContainerStyle}
        style={styles.buttonStyle}
        onPress={(event) => {
          func && func();
        }}
      >
        {text}
      </Button>
    );
  }

  getLoading() {
    return this.refs['loading'];
  }

  getLoading2() {
    // this offsetY = StatusBar.height + titlebar.height + button.height * 2 + row.padding
    let offsetY = 20 + 44 + 38 * 2 + 5 * 2;
    return this.refs['loading2'].setLoadingOffset(0, -offsetY);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainerStyle: {
    padding:10,
    marginRight: 3,
    marginBottom: 3,
    height:35,
    width: 120,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: '#6A6AD5',
  },
  buttonStyle: {
    fontSize: 12,
    color: 'white',
  },
  titlebar: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3FB4CF',
    flexDirection: 'row'
  }

});

module.exports = App;
