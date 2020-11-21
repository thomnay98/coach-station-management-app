import React, { Component } from 'react';
import './contract.css';
import GoogleMapReact from 'google-map-react';

class ContractPage extends Component {

    static defaultProps = {
        center: {
            lat: 10.8795784,
            lng: 106.8190554
        },
        zoom: 15
    };

    render() {
        return (
            <div className="container">
                <div className="contract-info">
                    <h2>Thông tin liên hệ:</h2>
                    <div className="ct-info">
                        <h3>Công ty bán vé Miền Đông</h3>
                        <h3>Hotline: 0303030303</h3>
                        <h3>Địa chỉ: 39448 Xa lộ Hà Nội, Bình An, Quận 9, Thành phố Hồ Chí Minh, Việt Nam</h3>
                    </div>
                </div>
                <div className="contract-box">
                    <div className="contract">
                        <h2>Hỏi đáp/góp ý</h2>
                        <input type="text" className="ct-field" placeholder="Họ tên" />
                        <input type="email" className="ct-field" placeholder="Email" />
                        <input type="text" className="ct-field" placeholder="Số điện thoại" />
                        <textarea className="ct-field" placeholder="Nội dung..." />
                        <button>Gửi</button>
                    </div>
                    <div className="map-address">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyC9hps-Ih3duefNJk6NMnlOCuoua5XdmVM' }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContractPage;