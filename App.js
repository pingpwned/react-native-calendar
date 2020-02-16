/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Calendar from './components/calendar'
import GestureRecognizer from './components/gestures'

export default class App extends React.Component {
  componentDidMount = () => {
    let now = Date.now()
    let today = new Date(now)
    let currentMonth = today.getMonth()+1
    let currentYear = today.getYear()+1900
    this.setState({ today, currentMonth, currentYear })

  }

  state = {
    today: null,
  }

  render = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
        <GestureRecognizer  onSwipeLeft={this.onSwipeLeft}
                                onSwipeRight={this.onSwipeRight}
                                config={config} 
                                style={{bottom: 0}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>       
                                
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            
              <View onMoveShouldSetResponder={() => this.handleOnStartShouldSetResponder} onMoveShouldSetResponder={() => this.handleOnMoveShouldSetResponder} style={styles.body}>
                  {this.state.today ?
                    // Month name
                    (<View>
                      <Calendar loadPrevMonth={this.loadPrevMonth} loadNextMonth={this.loadNextMonth} today={this.state.today} />
                    </View>)
                    :
                    <Text>""</Text>
                  }
              </View>
              
          </ScrollView>
          </GestureRecognizer>
        </SafeAreaView>
      </>
   );
  }
  loadPrevMonth = e => {
    let today = new Date(this.state.currentYear, --this.state.currentMonth, 0)
    this.setState({today})
  }
  loadNextMonth = e => {
    let today = new Date(this.state.currentYear, ++this.state.currentMonth, 0)
    this.setState({today})
  }
  onSwipeLeft = () => {
    this.loadNextMonth()
   }
 
   onSwipeRight = () => {
    this.loadPrevMonth()
   }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  monthName: {
    
  },
  button: {
    backgroundColor: Colors.white,
    color: Colors.dark,
  },
  dayName: {
    margin: 5,
  },
  sectionMonth: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  today: {
    backgroundColor: Colors.dark,
    borderRadius: 50,
    width: 55, 
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayText: {
    color: Colors.white,
  }
});