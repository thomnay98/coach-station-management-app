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
  },
});

const SignInScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.header}>Đăng nhập</Text>
        <View>
          <Input placeholder={'Email'} />
          <Input placeholder={'Mật khẩu'} secureTextEntry />
        </View>
        <View style={style.forgotContainer}>
          <TouchableOpacity>
            <Text style={style.btnTextForgot}>Quên mật khẩu ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={style.btnLogin}>
          <Text style={[style.btnTextForgot, {color: 'white'}]}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', padding: 20}}>or</Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Không là thành viên, </Text>
          <TouchableOpacity >
            <Text style={[style.btnTextForgot, {color: 'red'}]}>đăng ký ngay!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
