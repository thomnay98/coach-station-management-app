import React, { Component } from 'react';
import './auth.css';
import { Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

import { register } from './../../actions/UserAction';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: null,
      email: null,
      password: null,
      passwordAgain: null,
      phone: null,
      formErrors: {
        fullName: "",
        email: "",
        password: "",
        passwordAgain: "",
        phone: "",
      },
      isLoading: false,
      isPasswordShown: false,
      isPasswordAgainShown: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });

    if (formValid(this.state)) {
      console.log(`
        --THÔNG TIN--
        Họ Tên: ${this.state.fullName}
        Email: ${this.state.email}
        Mật khẩu: ${this.state.password}
        Nhập lại mật khẩu: ${this.state.passwordAgain}
        Số điện thoại: ${this.state.phone}
      `);
      const newUser = {
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
      }
      register(newUser).then(res => {
        if(res){
          this.setState({ isLoading: false });
          console.log(res);
          this.props.history.push('/dangnhap');
          message.success('Đăng ký tài khoản thành công!');
        } else {
          this.setState({ isLoading: false })
          message.error('Đăng ký tài khoản không thành công!')
        }
      })

    } else {
      this.setState({ isLoading: false })
      console.error("Thông tin nhập sai, vui lòng nhập lại");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "fullName":
        formErrors.fullName =
          value.length < 1 ? "Họ tên không được để trống" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Email không hợp lệ";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Mật khẩu ít nhất 6 ký tự" : "";
        break;
      case "passwordAgain":
        formErrors.passwordAgain =
          value !== this.state.password ? "Mật khẩu không giống" : "";
        break;
      case "phone":
        formErrors.phone =
          value.length !== 10 ? "Số điện thoại không hợp lệ" : "";
        break;
      case "nID":
        formErrors.nID =
          value.length < 1 ? "CMND không được để trống" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  togglePasswordVisible = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  togglePasswordAgainVisible = () => {
    const { isPasswordAgainShown } = this.state;
    this.setState({ isPasswordAgainShown: !isPasswordAgainShown });
  };

  render() {

    const { formErrors } = this.state;
    const { isPasswordShown } = this.state;
    const { isPasswordAgainShown } = this.state;

    return (
      <div className="wrapper">
        <div className="formReg-wrapper">
          <h1>Đăng ký thành viên</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="fullName">
              <label htmlFor="fullName">Họ Tên</label>
              <Input className={`input ${formErrors.email.length > 0 ? "error" : null}`}
                    placeholder="Nhập họ tên" type="text" name="fullName" noValidate 
                    value={this.state.fullName} onChange={this.handleChange} 
              />
              {formErrors.fullName.length > 0 && (
                <span className="errorMessage">{formErrors.fullName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <Input className={`input ${formErrors.email.length > 0 ? "error" : null}`}
                    placeholder="Nhập địa chỉ Email" type="text" name="email" noValidate 
                    value={this.state.email} onChange={this.handleChange} 
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Mật khẩu</label>
              <Input className={`input ${formErrors.email.length > 0 ? "error" : null}`}
                    placeholder="Nhập mật khẩu" type={isPasswordShown ? "text" : "password"} name="password" 
                    noValidate value={this.state.password} onChange={this.handleChange}
                    suffix={isPasswordShown 
                            ? 
                              <EyeInvisibleOutlined className="eye" onClick={this.togglePasswordVisible}/>
                            : <EyeOutlined className="eye" onClick={this.togglePasswordVisible}/>}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="passwordAgain">
              <label htmlFor="passwordAgain">Nhập lại mật khẩu</label>
              <Input className={`input ${formErrors.email.length > 0 ? "error" : null}`}
                    placeholder="Nhập lại mật khẩu" type={isPasswordAgainShown ? "text" : "password"} name="passwordAgain" 
                    noValidate value={this.state.passwordAgain} onChange={this.handleChange}
                    suffix={isPasswordAgainShown 
                      ? 
                        <EyeInvisibleOutlined className="eye" onClick={this.togglePasswordAgainVisible}/>
                      : <EyeOutlined className="eye" onClick={this.togglePasswordAgainVisible}/>}
                     
              />
              {formErrors.passwordAgain.length > 0 && (
                <span className="errorMessage">{formErrors.passwordAgain}</span>
              )}
            </div>
            <div className="phone">
              <label htmlFor="phone">Số điện thoại</label>
              <Input className={`input ${formErrors.email.length > 0 ? "error" : null}`}
                    placeholder="Nhập số điện thoại" type="text" name="phone" noValidate
                    value={this.state.phone} onChange={this.handleChange} 
              />
              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
              )}
            </div>
            <div className="createAccount">
              <Button className="btn" type="primary" htmlType="submit" loading={this.state.isLoading} >Đăng ký</Button>
              <span>Đã có tài khoản, <Link to="/dangnhap">Đăng nhập ngay!</Link></span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default withRouter(RegistrationForm);