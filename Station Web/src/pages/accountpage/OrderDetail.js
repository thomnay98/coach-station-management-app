import React, { Component } from 'react';
import moment from "moment";
import './account.css';
import { withRouter } from 'react-router';
import { Col, Row, Button, Card, Modal, message } from 'antd';
import callApi from './../../utils/APIBooking';


class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            isLoading: false,
            reason: '',
            modalVisible: false
        }
    }

    componentDidMount(){
        const { orderID } = this.props.match.params

        callApi(`vexe?Madonhang=${orderID}`, 'GET', null).then(res => {
            console.log(JSON.stringify(res.data))
          this.setState({
            tickets: res.data.data
          })
        })
    }

    onChangeReason = async e => {
        this.setState({ 
            reason: e.target.value,
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
        callApi(`vexe/vetra/${code}`, 'patch', {Lydotra: reason}).then(res => {
            if (res) {
                console.log('Hủy vé thành công');
                this.setState({
                    isLoading: true,
                    modalVisible: false
                })
                this.props.history.push(`/donhang`);
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
        
        return (
            <div className="container site-layout-background">
                <div className="tk-card">
                    <h1>Thông tin đơn hàng</h1>
                    {this.state.tickets && this.state.tickets.map((ticket, index )=>
                        <Card style={{ width: '100%' }} key={index}>
                            <Row>
                                <Col span={6}>
                                    <div id="info-sp">
                                        <span> Hành Khách: </span>
                                        <span style={{marginLeft: 10}}>{ticket.Hoten}</span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Email: </span>
                                        <span style={{marginLeft: 10}}>{ticket.Email}</span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Số điện thoại: </span>
                                        <span style={{marginLeft: 10}}>{ticket.SoDienThoai}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div id="info-sp">
                                        <span> Mã vé: </span>
                                        <span style={{marginLeft: 10}}>{ticket.CodeVe}</span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Ngày đi: </span>
                                        <span style={{ marginLeft: 10 }}>{moment(ticket.NgayDi).format("HH:mm, DD/MM/YYYY")}</span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Số ghế: </span>
                                        <span style={{marginLeft: 10}}>{ticket.SoGhe}</span>
                                    </div>
                                </Col>
                                <Col span={5}>
                                    <div id="info-sp">
                                        <span> Điểm đón: </span>
                                        <span style={{marginLeft: 10}}>{ticket.DiaDiemDon}</span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Điểm trả: </span>
                                        <span style={{marginLeft: 10}}>{ticket.DiaDiemTra}</span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Giá tiền: </span>
                                        <span style={{marginLeft: 10, fontWeight: 600 }}>{ticket.GiaTien} VNĐ</span>
                                    </div>
                                </Col>
                                <Col span={5}>
                                    <div id="info-sp">
                                        <span> Trạng thái: </span>
                                        <span style={{ marginLeft: 10 }}>
                                            {
                                                ticket.TrangThai === 1 &&
                                                'Chưa thanh toán'
                                            }
                                            {
                                                ticket.TrangThai === 2 &&
                                                'Đã thanh toán'
                                            }
                                            {
                                                ticket.TrangThai === 3 &&
                                                'Đã hủy vé'
                                            }
                                        </span>
                                    </div>
                                    <div id="info-sp">
                                        <span> Ghi chú: </span>
                                        <span style={{marginLeft: 10}}>{ticket.Ghichu}</span>
                                    </div>
                                </Col>
                            </Row>
                            {
                                ticket.TrangThai === 1 &&
                                    <Button className="btn-cancel-ticket" type="primary" danger onClick={() => this.showCancelTicketModal()} >Hủy vé</Button>
                            }
                            {
                                ticket.TrangThai === 3 &&
                                    <Button className="btn-cancel-ticket" disabled>Đã Hủy</Button>
                            }
                            {
                                ticket.TrangThai === 2 &&
                                    <Button className="btn-cancel-ticket" disabled>Đã thanh toán</Button>
                            }
                            
                            <Modal
                                title="Trả vé"
                                className="modal-cancel-ticket"
                                visible={this.state.modalVisible}
                                onOk={() => this.handleOk(ticket.CodeVe, this.state.reason)}
                                okType= 'danger'
                                okButtonProps={{ disabled: !this.state.reason }}
                                confirmLoading={this.state.isLoading}
                                onCancel={() => this.setModalVisible(false)}
                            >
                                <label htmlFor="cancelTicket">Bạn chắc chắn muốn trả vé? Vui lòng nhập lý do trả vé.</label>
                                <input className="in-cancel-ticket" placeholder="Nhập lý do trả"
                                    // value={this.state.reason}
                                    onChange={e => this.onChangeReason(e)}
                                />
                            </Modal>
                        </Card>
                    )}
                    
                </div>
            </div>
        )
    }
}

export default withRouter(OrderDetail);
