import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
  } from 'react-native';
import {Block, Button, TextView} from '../../components';
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    headerText: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 20,
        margin: 15
    },
    tabTicket: {
        justifyContent: 'space-around',
    },
    itemTabTicket: {
        borderColor: '#FFF',
        height: 30,
        width: 100,
        alignSelf: 'center',
        borderRadius: 5
    }
});

export default class CheckScreen extends Component {
    render() {
        return (
            <Block height={60} color='#58FA82'>
                <TextView center style={styles.headerText}>Vé của tôi</TextView>
            </Block>
        )
    }
}
