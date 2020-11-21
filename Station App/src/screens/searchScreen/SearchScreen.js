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
import DatePicker from 'react-native-datepicker';
import Feather from 'react-native-vector-icons/Feather';

import PickPlace from './PickPlace';
import ItemRide from './ItemRide';

const styles = StyleSheet.create({
    bg: {
        padding: 10,
        margin: 5,
        marginTop: 10,
        width: 400,
        height: 100,
        alignSelf: 'center',
        borderRadius: 10,
    },
    date: {
        padding: 5,
        margin: 5,
        width: 220,
        height: 50,
        borderRadius: 10,
    },
    search: {
        padding: 10,
        margin: 0,
        marginTop: -5,
        marginLeft: 35,
        width: 160,
        height: 50,
        borderRadius: 10,
    },
});

export default class SearchScreen extends Component {
    constructor(props){
        super(props)
        this.state = {date:""}
    }
    render() {
        return (
                <Block block color='#58FA82'>
                    <Block color='#FFF' style={styles.bg}>
                        <PickPlace />
                        <Block direction='row'>
                            <Feather name="more-vertical" size={26} />
                            <Block margin={12} height={1} width={'80%'} color={'#000'} />
                        </Block>
                        <PickPlace />
                    </Block>
                    <Block direction="row" color='#FFF' style={styles.date}>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="Chọn ngày đi"
                            format="DD-MM-YYYY"
                            minDate="01-01-2020"
                            maxDate="01-01-2030"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    borderColor: '#FFF'
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        <Button color='#405DC9' style={styles.search}>
                            <TextView h5 center color={'#FFF'}>Tìm vé xe</TextView>
                        </Button>
                    </Block>
                    <ScrollView>
                        <ItemRide />
                        <ItemRide />
                        <ItemRide />
                        <ItemRide />
                    </ScrollView>
                </Block>
        )
    }
}
