import React, { Component } from 'react';

class BrandInfo extends Component {

    render() {
        var { brand } = this.props;
        return (
            <div className="brand-info">
                <h2>Thông tin hãng xe</h2>
                <div className="_info">
                    <h3>Tên nhà xe: </h3>
                    <p>{brand.TenNhaXe}</p>
                </div>
                <div className="_info">
                    <h3>Địa chỉ: </h3>
                    <p>{brand.DiaChi}</p>
                </div>
                <div className="_info">
                    <h3>Điện thoại: </h3>
                    <p>{brand.DienThoai1}</p>
                </div>
                <div className="_info">
                    <h3>Điện thoại: </h3>
                    <p>{brand.DienThoai2}</p>
                </div>
                <div className="_info">
                    <h3>Người đại diện: </h3>
                    <p>{brand.NguoiDaiDien}</p>
                </div>
            </div>
        );
    }
}

export default BrandInfo;