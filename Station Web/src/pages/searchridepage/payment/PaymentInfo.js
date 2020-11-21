import '../srp.css';
import React, { Component } from 'react';
import { Card } from 'antd';
import moment from 'moment';

class PaymentInfo extends Component {
    render() {
        return (
            <div className="pay-info">
                <h3 id="pay-h3">Thông tin chuyến đi</h3>
                <Card style={{ width: 'auto' }} className="card-pm">
                    <div className="_info">
                        <span> Hành Khách: </span>
                        <span id="_info-detail">{this.props.data.name} </span>
                    </div>
                    <div className="_info">
                        <span> Email: </span>
                        <span id="_info-detail">{this.props.data.email} </span>
                    </div>
                    <div className="_info">
                        <span> Số điện thoại: </span>
                        <span id="_info-detail">{this.props.data.phone} </span>
                    </div>
                    <hr />
                    <div className="_info">
                        <span> Tuyến: </span>
                        <span id="_info-detail">Ho Chi Minh -{'>'} {this.props.ride.TenTuyenDuong} </span>
                    </div>
                    <div className="_info">
                        <span> Nhà xe: </span>
                        <span id="_info-detail">{this.props.ride.MaNhaXe} </span>
                    </div>
                    <div className="_info">
                        <span> Tài: </span>
                        <span id="_info-detail">{this.props.ride.SoTai} </span>
                    </div>
                    <div className="_info">
                        <span> Biển số xe: </span>
                        <span id="_info-detail">{this.props.ride.BienSoXe} </span>
                    </div>
                    <div className="_info">
                        <span> Giờ xuất bến: </span>
                        <span id="_info-detail">
                            {moment(this.props.ride.GioDi).format("HH:mm")}
                            {', '}
                            {moment(this.props.data.dayGo).format("DD/MM/YYYY")} 
                        </span>
                    </div>
                    <div className="_info">
                        <span> Điểm đón: </span>
                        <span id="_info-detail">{this.props.data.start} </span>
                    </div>
                    <div className="_info">
                        <span> Số ghế: </span>
                        <span id="_info-detail">{this.props.data.seat && this.props.data.seat.map((ghe, index) => {
                            return <span className="h3" key={index}>{ghe} </span>

                        })
                        } </span>
                    </div>
                    <div className="_info">
                        <span> Loại ghế: </span>
                        <span id="_info-detail">
                            { this.props.ride.MaLoaiGhe === "BED" && "Giường nằm" }
                            {this.props.ride.MaLoaiGhe === "LYING" && "Ghế nằm"}
                            {this.props.ride.MaLoaiGhe === "NORMAL" && "Ghế ngồi"} 
                        </span>
                    </div>
                </Card>
                <div id="info-sum">
                    <span> TỔNG TIỀN: </span>
                    <span style={{ marginLeft: 20, color: "red"}}>{this.props.data.price} VNĐ</span>
                </div>
            </div>
        );
    }
}

export default PaymentInfo;