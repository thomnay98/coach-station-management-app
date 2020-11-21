import React, { Component } from 'react';
import './account.css';
import { Input, Button, message } from 'antd';
import { withRouter } from 'react-router';
import { changePassword } from './../../actions/UserAction';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            newPassAgain: '',
            errors: {},
            isLoading: false,
        }
    }

    handleUpdate = (token, oldP, newP) => {
        this.setState({ isLoading: true });
        const data = {
            oldPassword: oldP,
            newPassword: newP,
        }
        changePassword(token, data).then(res => {
            if (res) {
                this.setState({ isLoading: false })
                message.success('Đổi mật khẩu thành công!')
            } else {
                console.log('Hủy vé thất bại');
                this.setState({ isLoading: false })
                message.error('Đổi mật khẩu không thành công!')
            }
        })
    }

    render() {
        const token = localStorage.usertoken
        console.log(token)

        return (
            <div className="site-layout-background container">
                <div className="form-update">
                    <h1>Đổi mật khẩu</h1>
                    <form noValidate>
                        <div className="fullName">
                            <label htmlFor="oldPass">Mật khẩu cũ</label>
                            <Input className="in-update"
                                type="text" name="oldPass" noValidate
                                value={this.state.oldPass}
                                onChange={event => this.setState({ oldPass: event.target.value })}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="newPass">Mật khẩu mới</label>
                            <Input className="in-update"
                                type="text" name="newPass" noValidate
                                value={this.state.newPass}
                                onChange={event => this.setState({ newPass: event.target.value })}
                            />
                        </div>
                        <div className="phone">
                            <label htmlFor="newPassAgain">Nhập lại mật khẩu mới</label>
                            <Input className="in-update"
                                type="text" name="newPassAgain" noValidate
                                value={this.state.phone}
                                onChange={event => this.setState({ phone: event.target.value })}
                            />
                        </div>
                        <div className="createAccount">
                            <Button className="in-update" type="primary" htmlType="submit"
                                onClick={() => this.handleUpdate(token, this.state.oldPass, this.state.newPass)}
                            >
                                Cập nhật mật khẩu
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(ChangePassword);