import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class RightMenu extends Component {

    logOut (e) {
        e.preventDefault()
        localStorage.clear('usertoken')
        setTimeout(() => {
            this.props.history.push(`/dangnhap`)
        }, 1000)
    }

    render() {
        const name = localStorage.name
        return (
            <Menu mode={this.props.mode} id="bg-menu">
                <Menu.Item key="check">
                    <NavLink exact to="/kiemtrave" activeClassName="nav-active">Kiểm tra vé</NavLink>
                </Menu.Item>
                {localStorage.usertoken
                    ?
                    <SubMenu title={`Chào ${name}!`}>
                        <MenuItemGroup>
                            <Menu.Item key="profile" ><NavLink exact to="/taikhoan">Thông tin cá nhân</NavLink></Menu.Item>
                            <Menu.Item key="order" ><NavLink exact to="/donhang">Đơn hàng của tôi</NavLink></Menu.Item>
                            <Menu.Item key="changePass" ><NavLink exact to="/doimatkhau">Thay đổi mật khẩu</NavLink></Menu.Item>
                            <Menu.Item key="login" ><NavLink exact to="/dangnhap" onClick={this.logOut.bind(this)} >Đăng xuất</NavLink></Menu.Item>
                            
                        </MenuItemGroup>
                    </SubMenu>
                    :
                    <SubMenu title="Tài khoản">
                        <MenuItemGroup title="Dành cho thành viên">
                            <Menu.Item key="login" ><NavLink exact to="/dangnhap">Đăng nhập</NavLink></Menu.Item>
                            <Menu.Item key="signup" ><NavLink exact to="/dangky">Đăng ký</NavLink></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                }
            </Menu>
        );
    }
}

export default withRouter(RightMenu);