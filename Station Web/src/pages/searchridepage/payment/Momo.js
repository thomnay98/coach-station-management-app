import React, { Component } from 'react';
import moMoImg from './../../../images/momo.PNG';

class Momo extends Component {
    render() {
        return (
            <div className="momo-box">
                <h2>Quét mã bằng ứng dụng momo để tiến hành thanh toán</h2>
                <img src={moMoImg} alt="momo" />
                <h3>Sau khi đã thanh toán, tích đồng ý chính sách và nhấp vào "THANH TOÁN"</h3>
            </div>
        );
    }
}

export default Momo;