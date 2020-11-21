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
import {Block, Input, TextView} from '../../components';
import Feather from 'react-native-vector-icons/Feather';

export default class PickPlace extends Component {
    render() {
        return (
            <Block direction='row'>
                <Feather name="map-pin" size={25} />
                <TextView > Chọn nơi đi</TextView>
            </Block>
        )
    }
}
