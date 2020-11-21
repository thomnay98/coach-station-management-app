import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';


class LeftMenu extends Component {
    render() {
        console.log();

        return (
            <Menu mode={this.props.mode} id="bg-menu">
                <Menu.Item key="mail">
                    <NavLink exact to="/" activeClassName="nav-active">Trang chủ</NavLink>
                </Menu.Item>
                <Menu.Item key="brand">
                    <NavLink exact to="/hangxe" activeClassName="nav-active">Hãng xe</NavLink>
                </Menu.Item>
                <Menu.Item key="contract">
                    <NavLink exact to="/lienhe" activeClassName="nav-active">Liên hệ</NavLink>
                </Menu.Item>
            </Menu>
        );
    }
}

export default LeftMenu;