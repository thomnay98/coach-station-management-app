import '../srp.css';
import React, { Component } from 'react';
import { Statistic, Row, Col } from 'antd';

import PaymentMethod from './PaymentMethod';
import PaymentInfo from './PaymentInfo';
import callApi from '../../../utils/APIBooking';

const { Countdown } = Statistic;

class PaymentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataOrder: this.props.location.state.order,
            chuyenXe: [],
            deadline: Date.now() + 5 * 60 * 60 * 24 * 2 + 1230* 10 * 3
        }
        this.getChuyenXe();
    }

    getChuyenXe = () => {
        const id = this.state.dataOrder.idRide
        console.log("ma id" + id)
        callApi(`chuyenxe/${id}`).then(res => {
            this.setState({
                chuyenXe: res.data,
            }, () => {
                console.log(this.state.chuyenXe);
            })
        })
    }

    onFinish = () => {
        console.log('Đã hết thời gian thanh toán!')
    }

    render() {

        return (
            <div className="pay-layout">
                <div className="container">
                    <Row className="pay">
                        <Col span={12} id="sp1">Xác nhận thanh toán</Col>
                        <Col span={12}>
                            <Countdown style={{float: 'right'}} value={this.state.deadline} valueStyle={{ color: 'red', fontWeight: 600 }} onFinish={this.onFinish} format="mm:ss" />
                            <span id="sp2"> Thời gian thanh toán còn lại: </span>
                        </Col>
                    </Row>
                    <hr style={{border: 'solid 1.5px blueViolet'}} />
                    <Row>
                        <PaymentMethod order={this.state.dataOrder} ride={this.state.chuyenXe} 
                        />
                        <PaymentInfo data={this.state.dataOrder} ride={this.state.chuyenXe} />
                    </Row>
                </div>
            </div>
        );
    }
}

export default PaymentPage;