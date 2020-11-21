import React, { Component } from 'react';
import './navbar.css';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Drawer, Button } from 'antd';
import { NavLink } from 'react-router-dom';

class MainMenu extends Component {
    state = {
        current: 'mail',
        visible: false
      }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
          visible: false,
        });
      };
    render() {
        return (
            <div id="bg-menu">
                <nav className="menuBar container">
                    <div className="logo">
                        <NavLink exact to="/">VeXe</NavLink>
                    </div>
                    <div className="menuCon">
                        <div className="leftMenu">
                            <LeftMenu mode="horizontal" />
                        </div>
                        <div className="rightMenu">
                            <RightMenu mode="horizontal" />
                        </div>
                        <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                            <span className="barsBtn"></span>
                        </Button>
                        <Drawer
                            title="Menu"
                            placement="right"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}>
                            <LeftMenu mode="vertical" />
                            <RightMenu mode="vertical" />
                        </Drawer>
                    </div>
                </nav>
            </div>
        );
    }
}

export default MainMenu;