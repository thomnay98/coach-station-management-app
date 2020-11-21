import React, { Component} from 'react';
import './auth.css';
import { Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login } from './../../actions/UserAction';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: {},
      isPasswordShown: false,
      isLoading: false,
      isLogined: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e)
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ isLoading: true })
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(user)
    login(user).then(res => {
      if (res) {
        this.setState({ isLoading: false });
        localStorage.setItem('usertoken', res.token);
        localStorage.setItem('name', res.name);
        this.props.history.push(`/`);
        message.success('Đăng nhập thành công!');
        console.log(localStorage.usertoken);
        console.log(localStorage.name);
      } else {
        this.setState({ isLoading: false })
        message.error('Tên đăng nhập hoặc mật khẩu không hợp lệ!')
      }
    })
  }

  togglePasswordVisible = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render() {

    const { isPasswordShown } = this.state;

    return (
      <div className="wrapper">
        <div className="formLg-wrapper">
          <h1>Đăng nhập</h1>
          <form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onSubmit={this.handleSubmit}
          >
            <div>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    style={{ width: 300 }}
                    //className="input" 
                    type="username"
                    placeholder="Tên đăng nhập"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange} 
              />
            </div>
            <div>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type={isPasswordShown ? "text" : "password"} 
                    placeholder="Mật khẩu" style={{ width: 300}}
                    //className="input"
                    suffix={isPasswordShown 
                      ? 
                        <EyeInvisibleOutlined className="eye-login" onClick={this.togglePasswordVisible}/>
                      : <EyeOutlined className="eye-login" onClick={this.togglePasswordVisible}/>}
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} 
              />
            </div>
            <div>
              <Checkbox name="remember" valuePropName="checked" noStyle>Nhớ tài khoản</Checkbox>

              <a className="login-form-forgot" href="/login">
                Quên mật khẩu
              </a>
            </div>

            <div>
              <Button className='btn' type="primary" htmlType="submit" loading={this.state.isLoading}>
                Đăng nhập
              </Button>
              Chưa có tài khoản, <Link to="/dangky">đăng ký ngay!</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default LoginForm;