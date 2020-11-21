import React from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

const styles = StyleSheet.create({
    headerText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 15
    },
    avtText: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 5
    },
    proFile: {
        margin: 5,
        marginTop: 10,
        width: 400,
        height: 100,
        alignSelf: 'center',
        borderRadius: 10,
    },
    itemAccount: {
        padding: 12,
        margin: 5,
        marginTop: 10,
        width: 400,
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
    }
});

const AccountScreen = () => {
    return (
        <Block block>
            <Block height={60} width='100%' color='#58FA82'>
                <TextView style={styles.headerText}>Tài khoản</TextView>
            </Block>
            <Block direction='row' height={100} color='#FFF' style={styles.proFile}>
                <Button margin={10} width={80}>
                    <Avatar rounded title="AVT" size={80} />
                </Button>
                <Block direction='column'>
                    <TextView style={styles.avtText}>Tên tài khoản</TextView>
                    <Button color={'yellow'} borderRadius={5} >
                        <TextView size={20} bold padding={5}>Chỉnh sửa thông tin cá nhân</TextView>
                    </Button>
                </Block>
            </Block>
            <Button direction='row' height={60} color='#FFF' style={styles.itemAccount}>
                <MaterialIcons name="notifications-none" size={24} />
                <TextView h6>Tài khoản</TextView>
            </Button>
            <Button direction='row' height={60} color='#FFF' style={styles.itemAccount}>
                <MaterialIcons name="star-border" size={24} />
                <TextView h6>Đánh giá chúng tôi</TextView>
            </Button>
            <Button direction='row' height={100} color='#FFF' style={styles.itemAccount}>
                <Feather name="settings" size={24} />
                <TextView h6>Cài đặt</TextView>
            </Button>
            <Button direction='row' height={60} color='#FFF' style={styles.itemAccount}>
                <FontAwesome name="question-circle-o" size={23} />
                <TextView h6>Hỗ trợ</TextView>
            </Button>
            <Button direction='row' height={100} color='#FFF' style={styles.itemAccount}>
                <Feather name="phone" size={24} />
                <TextView h6>Liên hệ</TextView>
            </Button>
        </Block>
    );
}

export default AccountScreen;
