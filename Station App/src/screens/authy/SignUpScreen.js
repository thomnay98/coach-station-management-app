import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Input from './Input';
import Button from './Button';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wrapper: {
    padding: 14,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  btnTextForgot: {
    fontWeight: 'bold',
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  btnLogin: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
});

const SignUpScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.header}>Đăng ký thành viên</Text>
        <View>
            <Input placeholder={'Số điện thoại'} />
            <Input placeholder={'Email'} />
            <Input placeholder={'Mật khẩu'} secureTextEntry />
            <Input placeholder={'Nhập lại mật khẩu'} secureTextEntry />
        </View>
        <TouchableOpacity style={style.btnLogin} >
          <Text style={[style.btnTextForgot, {color: 'white'}]}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
