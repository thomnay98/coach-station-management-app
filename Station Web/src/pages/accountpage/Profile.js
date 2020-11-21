import React, { Component } from 'react';
import './account.css';
import { Input, Button, message } from 'antd';
import { getProfile, updateProfile } from './../../actions/UserAction';

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {},
            isLoading: false,
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        getProfile(token).then(res => {
            if(res){
                this.setState({
                    name: res.name,
                    email: res.email,
                    phone: res.phone,
                })
            }
        })
    }

    handleUpdate = ( token, name, email, phone ) => {
        this.setState({ isLoading: true });
        const data ={
            email: email,
            name: name,
            phone: phone,
        }
        updateProfile( token, data).then(res => {
            if(res){
                this.setState({ isLoading: false })
                message.success('Cập nhật thành công!')
            } else {
                console.log('Hủy vé thất bại');
                this.setState({ isLoading: false })
                message.error('Cập nhật không thành công!')
            }
        })
    }

    render() {

        const token = localStorage.usertoken
        console.log(token)

        return (
            <div className="site-layout-background container">
                <div className="form-update">
                    <h1>Thông tin cá nhân</h1>
                    <form noValidate>
                    <div className="fullName">
                        <label htmlFor="fullName">Họ Tên</label>
                        <Input className="in-update"
                            type="text" name="fullName" noValidate
                            value={this.state.name}
                            onChange={ event => this.setState({ name: event.target.value })}
                        />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <Input className="in-update" 
                                type="text" name="email" noValidate
                                value={this.state.email}
                        />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">Số điện thoại</label>
                        <Input className="in-update" 
                                type="text" name="phone" noValidate
                                value={this.state.phone}
                                onChange={event => this.setState({ phone: event.target.value })}
                        />
                    </div>
                    <div className="createAccount">
                        <Button className="in-update" type="primary" htmlType="submit"
                                onClick={() => this.handleUpdate(token, this.state.name, this.state.email, this.state.phone)}
                        >
                            Cập nhật thông tin
                        </Button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}
