import React, { Component } from 'react';
import { Table, Col, Button, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';

import callApi from './../../utils/APIBooking';

const { Column } = Table;

class ListOder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            feedbacks: '',
            modalVisible: false,
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken;

        axios({
            method: 'get',
            url: 'http://api.banve.xyz/donhang/my-donhang?limit=100',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': '__cfduid=df8e80eef8c8d17095cbed3bf0b795c9c1597580737'
            },
            data: null
        }).then( res => {
            this.setState({
                orders: res.data.data
            })
        }).catch( err =>{
            console.log(err)
        })
    }

    onChangeFeedbacks= async e => {
        this.setState({
            feedbacks: e.target.value,
        });
    };
    
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    showCancelTicketModal() {
        this.setState({ modalVisible: true });

    }
    handleOk = (code, reason) => {
        console.log(reason)
        this.setState({ isLoading: true })
        callApi(`vexe/vetra/${code}`, 'patch', { Lydotra: reason }).then(res => {
            if (res) {
                console.log('Hủy vé thành công');
                this.setState({
                    isLoading: true,
                    modalVisible: false
                })
                message.success('Hủy vé thành công!');
            } else {
                console.log('Hủy vé thất bại');
                this.setState({
                    isLoading: false,
                    modalVisible: false
                })
                message.error('Hủy vé không thành công!')
            }
        })
    }

    render() {

        var data = (this.state.orders.map(order => ({
            key: order.SoDonhang, codes: order.MaDonhang, time: moment(order.NgayMua).format("LT , DD/MM/YYYY"), DiaDiemTra: order.DiaDiemTra, isPaid: order.DaThanhToan, prices: order.TongSoTien
          })));

          console.log(data)
        return (
            <div className="container site-layout-background">
                <h1>Đơn hàng của tôi</h1>
                <div>
                    <Table dataSource={data} size="middle">
                        <Column title="Mã đơn hàng" dataIndex="codes" key="codes" 
                            render={(text, record) => {
                                return (
                                    <Col key={record.key} style={{ marginRight: 16, fontWeight: "bold" }}>
                                        <Link to={`/donhang/${record.codes}`} style={{ color: "black"}}>{record.codes}</Link>
                                    </Col>
                                )
                            }} >
                        </Column>
                        <Column title="Ngày mua" dataIndex="time" key="time"
                                render={(text, record) => (
                                    <Col >{record.time}</Col>
                                )}
                                />
                        <Column title="Tuyến" key="DiaDiemTra"
                            render={(text, record) => (
                                <Col >Hồ Chí Minh -{'>'} {record.DiaDiemTra}</Col>
                            )}
                        />
                    
                        <Column
                            title="Tổng tiền"
                            key="prices"
                            render={(text, record) => (
                                <Col style={{ marginRight: 16, fontWeight: "bold" }}>{record.prices} VNĐ</Col>
                            )}
                        />
                        <Column
                            title="Trạng thái"
                            dataIndex="isPaid"
                            key="isPaid"
                            render={(text, record) => (
                                <Col >{record.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán'}</Col>
                            )}
                        />
                        <Column
                            title="Đánh giá"
                            dataIndex="isPaid"
                            key="isPaid"
                            render={() => (
                                <Button onClick={() => this.showCancelTicketModal()}>Đánh giá</Button>
                            )}
                        />
                    </Table>
                    <Modal
                        title="Đánh giá nhà xe"
                        className="modal-cancel-ticket"
                        visible={this.state.modalVisible}
                        onOk={() => this.handleOk()}
                        okButtonProps={{ disabled: !this.state.feedbacks }}
                        confirmLoading={this.state.isLoading}
                        onCancel={() => this.setModalVisible(false)}
                    >
                        <label htmlFor="cancelTicket">Đánh giá chuyến xe</label>
                        <textarea className="feedbacks" placeholder="Nội dung"
                            // value={this.state.reason}
                            onChange={e => this.onChangeFeedbacks(e)}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ListOder;