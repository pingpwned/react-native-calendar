/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            today: null,
            howManyDaysInMonth: null,
            firstMonthDay: null,
            currentMonth: null,
            currentYear: null,
            realToday: null,
            todayActive: true,
            monthNames: [ "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December" ],
            weekNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        }
    }
    componentDidMount = () => {
        let now = Date.now()
        let realToday = new Date(now)
        let today = this.props.today
        let currentMonth = today.getMonth()+1
        let prevMonth = today.getMonth()
        let nextMonth = today.getMonth()+2
        let currentYear = today.getYear()+1900
        let firstMonthDay =  new Date(currentYear, currentMonth, 1).getDay() // 0-6, 0: sun
        let howManyDaysInMonth = new Date(currentYear, currentMonth, 0).getDate()
        this.setState({ today, howManyDaysInMonth, firstMonthDay, currentMonth, currentYear, prevMonth, realToday, nextMonth })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.today !== nextProps.today) {
            let today = nextProps.today
            let currentMonth = today.getMonth()+1
            let prevMonth = today.getMonth()
            let nextMonth = today.getMonth()+2
            let currentYear = today.getYear()+1900
            //let firstMonthDay =  new Date(currentYear, currentMonth, 1).getDay() // 0-6, 0: sun
            let howManyDaysInMonth = new Date(currentYear, currentMonth, 0).getDate()
            this.setState({ today, howManyDaysInMonth, currentMonth, currentYear, prevMonth, nextMonth })
            if (today.getMonth() !== this.state.realToday.getMonth()) {
                this.setState({ todayActive: false, })
            } else {
                this.setState({ todayActive: true, })
            }
        }
    }
    
      createView = () => {
        let arr = []
    
        // Prev month
        let prevMonthDays = []
        let prevMonthDaysCount = new Date(this.state.currentYear, this.state.prevMonth, 0).getDate()
        
        for (var i = 1; i <= prevMonthDaysCount; i++) {
          prevMonthDays.push(i)
        }
        prevMonthDays = prevMonthDays.slice((prevMonthDays.length - (
            new Date(this.state.currentYear, this.state.prevMonth, 1).getDay() > 0 ? 
                (new Date(this.state.currentYear, this.state.prevMonth, 1).getDay() - 1) 
            :
               6
            ) 
        ), prevMonthDays.length)

        prevMonthDays.forEach((item, i) => {
            arr.push(
                <View key={i} style={{ backgroundColor: Colors.lighter, width: 55, height: 55, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: Colors.darker }}>{item}</Text>
                </View>
            )
        })
    
        // Current month's days
        for (var i = 1; i <= this.state.howManyDaysInMonth; i++) {
            arr.push(
                <View key={i+6} style={ this.state.todayActive && this.props.today.getDate() === i ? styles.today : {  width: 55, height: 55, alignItems: 'center', justifyContent: 'center' } } >
                    <Text style={ this.state.todayActive && this.props.today.getDate() === i ? styles.todayText : {}}>{i}</Text>
                </View>
            )
        }
    
        // Next month's days
        let nextMonthDays = []
        for (var i = 1; i <= (7 - new Date(this.state.currentYear, this.state.prevMonth, this.state.howManyDaysInMonth).getDay()); i++) {
          nextMonthDays.push(i)
        }

        // nextMonthDays = nextMonthDays.slice(0, (
        //     new Date(this.state.currentYear, this.state.prevMonth, 31).getDay() > 0 ? 
        //         (7 - new Date(this.state.currentYear, this.state.prevMonth, 31).getDay()) 
        //     :
        //        0
        //     ) 
        // )
        nextMonthDays.forEach((item, i) => {
        arr.push(
            <View key={i+38} style={{ backgroundColor: Colors.lighter, width: 55, height: 55, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: Colors.darker }}>{item}</Text>
            </View>
        )
        })
        return arr
      }
      
      render = () => {
        return (
          <>
            <View style={styles.sectionContainerFlex}>
                <Button style={styles.button} color={Colors.dark} title="<" onPress={(e) => this.props.loadPrevMonth(e) } />
                <Text style={styles.monthName}>{this.state.monthNames[this.props.today.getMonth()]}</Text>
                <Button style={styles.button} color={Colors.dark} title=">" onPress={(e) => this.props.loadNextMonth(e) } />
            </View>

            {
                // View for week day names
                <View style={styles.sectionMonth}>
                {  this.state.weekNames.map((item, i) => {
                    return (
                    <View key={i} style={{alignItems: 'center', justifyContent: 'center', width: 55, height: 55}}>
                        <Text style={{fontFamily: 'monospace'}}>{item}</Text>
                    </View>
                    )
                })
                }
                </View>
            }
            <View style={styles.sectionMonth}>
                {
                    this.createView()
                }
            </View>
          </>
        )
    }
}

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
    sectionContainerFlex: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
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
    monthName: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'monospace'
    },
    button: {
      fontFamily: 'monospace'
    },
    dayName: {
      margin: 5,
      fontFamily: 'monospace',
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
      fontFamily: 'monospace',
    }
  });