import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import {
    View,
    Text,
    Picker,
    StyleSheet,
    Dimensions,
    ScrollView,
  } from 'react-native';
import {Block, Button, TextView} from '../../components';

const styles = StyleSheet.create({
    bg: {
        margin: 5,
        marginTop: 10,
        width: 400,
        height: 120,
        alignSelf: 'center',
        borderRadius: 10,
    },
    search: {
        padding: 5,
        alignSelf: 'center',
        borderRadius: 5,
    },
    infoBrand: {
        paddingLeft: 5,
        justifyContent: 'space-around'
    },
    infoPrice: {
        justifyContent: 'space-around'
    }
});

export default class ItemRide extends Component {
    render() {
        return (
            <Block direction='row' color='#FFF' style={styles.bg}>
                <Image
                    source={{ uri: '../../assets/sg-ducba.jpg' }}
                    style={{ width: 120, height: 120, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                />
                <Block>
                    <Block direction='row' style={styles.infoPrice}>
                        <Block width={175} style={styles.infoBrand}>
                            <TextView size={20} color={'#000'}>Cô Hai</TextView>
                            <TextView color={'#3104B4'}>Giường nằm 46 chỗ</TextView>
                        </Block>
                        <Block>
                            <TextView bold color={'#DF0101'}>17h00</TextView>
                            <Button color='#405DC9' style={styles.search}>
                                <TextView h6 bold center color={'#FFF'}>Chọn chỗ</TextView>
                            </Button>
                        </Block>
                    </Block>
                    <Block margin={10} height={1} width={'95%'} color={'#BDBDBD'} />
                    <Block direction='row' style={styles.infoPrice}>
                        <Block>
                            <TextView color={'#848484'}>Khởi hành</TextView>
                            <TextView size={15} color={'#000'}>Sài Gòn</TextView>
                        </Block>
                        <Block height={35} width={1} color={'#BDBDBD'} />
                        <Block>
                            <TextView color={'#848484'}>Điểm đến</TextView>
                            <TextView color={'#000'}>Gia Lai</TextView>
                        </Block>
                        <Block height={35} width={1} color={'#BDBDBD'} />
                        <Block>
                            <TextView color={'#848484'}>Giá vé</TextView>
                            <TextView color={'#3104B4'}>300.000 đ</TextView>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}
