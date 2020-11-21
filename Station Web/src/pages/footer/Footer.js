import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="s-footer">
                <div className="container">
                  <div className="footer">
                    <div className="right-footer">
                      <h1>VeXe</h1>
                      Copyright &copy; {new Date().getFullYear()} By VeXe
                    </div>
                    <div className="left-footer">
                      <h3>Địa chỉ: 39448 Xa lộ Hà Nội, Bình An, Quận 9, Thành phố Hồ Chí Minh</h3>
                      <h3>Email: vemiendong@gmail.com </h3>
                      <h3>Hotline: 0969969969</h3>
                    </div>
                  </div>
                </div>
            </footer>
        );
    }
}

export default Footer;