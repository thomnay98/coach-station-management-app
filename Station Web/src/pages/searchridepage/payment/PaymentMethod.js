import '../srp.css';
import React, { Component } from 'react';
import { Checkbox, Button, message, Modal } from 'antd';
import { withRouter } from 'react-router';
import moment from 'moment';
import io from 'socket.io-client';

import ApiBooking from '../../../utils/APIBooking';
import CreditCard from './CreditCard';
import Bank from './Bank';
import Momo from './Momo';

const socket = io('http://api.banve.xyz', {
    path: '/socket',
});

class PaymentMethod extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            checked: false,
            disabled: true,
            isLoading: false,
            isPaid: false,
            dayPaid: null,
            urlB: '',
        };
    }

    datve = (machuyen) => {
        socket.emit("datve",
            { room: machuyen },
            () => {

            }
        );
    }

    checkOrder = (ride, order, check) => {
        if(order.seat.length > 4){
            if (check !== 1 && check !== 4){
                if (check === 2) {
                    this.handleOrder(ride, order, true, moment(), true);
                } else {
                    this.handleOrder(ride, order, true, moment(), false);
                }
            }else{
                this.warning();
            }
        }else{
            if (check !== 1 && check !== 4) {
                if (check === 2) {
                    this.handleOrder(ride, order, true, moment(), true);
                } else {
                    this.handleOrder(ride, order, true, moment(), false);
                }

            } else {
                this.handleOrder(ride, order, false, null, false);
            }
        } 
    }

    handleOrder = (ride, order, isPaid, dayPaid, isOpenUrl) => {
        this.setState({ isLoading: true })

        const data = {
            MaChuyen: ride.MaChuyen,
            DSGhe: order.seat,
            Hoten: order.name,
            SoDienThoai: order.phone,
            Email: order.email,
            TongSoTien: order.price,
            DaThanhToan: isPaid,
            NgayThanhToan: dayPaid,
            GhiChu: "Đón ở bến xe Miền Đông",
            DiaDiemDon: order.start,
            DiaDiemTra: order.end
        }      

        ApiBooking('donhang', 'POST', data).then(res => {
            if(res){
                this.datve(this.props.order.idRide);
                console.log('Đặt vé thành công');
                this.setState({ isLoading: false });
                if(isOpenUrl){
                    window.open(this.state.urlB, '_blank');
                    this.props.history.push(`/`);
                    message.success('Đặt vé thành công!', 15);
                }else{
                    this.props.history.push(`/`);
                    message.success('Đặt vé thành công!');
                }
                
            }else{
                console.log('Đặt vé thất bại');
                this.setState({ isLoading: false })
                message.error('Đặt vé không thành công!')
            } 
        })
    }

    toggleChecked = () => {
        this.setState({ checked: !this.state.checked });
    };
    
    toggleDisable = () => {
        this.setState({ disabled: !this.state.disabled });
    };

    getUrlB = (url) => {
        this.setState({
            urlB: url
        })
    }

    warning() {
        Modal.warning({
            title: 'Cảnh báo',
            content: 'Quý khách đặt nhiều hơn 4 ghế, vui lòng chọn hình thức thanh toán online',
        });
    }
    
    render() {

        const { ride, order } = this.props;

        return (
            <div className="pay-method">
                <h3 id="pay-h3">Phương thức thanh toán</h3>
                <form  className="pay-type">
                    <div className="radio-item">
                        <input className="pay-radio"
                            type="radio"
                            value={1}
                            checked={this.state.value === 1}
                            onChange={() => this.setState({ value: 1})}
                        />
                        <label className="radio-lb">Thanh toán tiền mặt tại bến xe</label>
                    </div>
                    <div className="radio-item">
                        <input className="pay-radio"
                            type="radio"
                            value={2}
                            checked={this.state.value === 2}
                            onChange={() => this.setState({ value: 2 })}
                        />
                        <label className="radio-lb">Thẻ ATM nội địa / Internet Banking</label>
                        {
                            this.state.value === 2
                                ?
                                (
                                    <div className="credit-card-box">
                                        <Bank getUrlB={this.getUrlB} />
                                    </div>
                                )
                                :
                                null
                        }
                    </div>
                    <div className="radio-item">
                        <input className="pay-radio"
                            type="radio"
                            value={3}
                            checked={this.state.value === 3}
                            onChange={() => this.setState({ value: 3 })}
                        />
                        <label className="radio-lb">Thẻ thanh toán quốc tế Visa, MasterCard, JCB</label>
                        {
                            this.state.value === 3
                                ?
                                (
                                    <div className="credit-card-box">
                                        <ul className="card-top">
                                            <li><img src={'https://salt.tikicdn.com/ts/upload/3b/63/a8/b48c8ea6f5eef4aecdd6e96028600067.png'} alt="Visa" /></li>
                                            <li><img src={'https://salt.tikicdn.com/ts/upload/a4/29/bd/789096005df664678e28e541b1332ce2.png'} alt="MasterCard" /></li>
                                            <li><img src={'https://salt.tikicdn.com/ts/upload/64/dd/13/7e66c599912fdfd723f3db61b0f9ec8b.png'} alt="JCB" /></li>
                                        </ul>
                                        <CreditCard />
                                    </div>
                                )
                                :
                                null
                        }
                    </div>
                    <div className="radio-item">
                        <input className="pay-radio"
                            type="radio"
                            value={4}
                            checked={this.state.value === 4}
                            onChange={() => this.setState({ value: 4 })}
                        />
                        <label className="radio-lb">Thanh toán tại cửa hàng tiện lợi gần nhà</label>
                    </div>
                    <div className="radio-item">
                        <input className="pay-radio"
                            type="radio"
                            value={5}
                            checked={this.state.value === 5}
                            onChange={() => this.setState({ value: 5 })}
                        />
                        <label className="radio-lb">Ví momo</label>
                        {
                            this.state.value === 5
                                ?
                                (
                                    <div className="credit-card-box">
                                        <Momo />
                                    </div>
                                )
                                :
                                null
                        }
                    </div>
                </form>
                <div id="pay-cb">
                    <Checkbox onClick={this.toggleDisable}>
                        Tôi đồng ý với chính sách và quy định của VeXe
                    </Checkbox>
                </div>
                <Button type="primary" htmlType="submit" className="pay-btn"
                        disabled={this.state.disabled}
                        onClick={() => {
                            this.checkOrder(ride, order, this.state.value)
                        }}
                >
                    THANH TOÁN
                </Button>
            </div>
        );
    }
}

export default withRouter(PaymentMethod);