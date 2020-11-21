import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { withRouter } from 'react-router';
import moment from 'moment';

import { getProfile } from './../../../actions/UserAction';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class InFo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            phone: null,
            start: null,
            end: null,
            isDisabled: false,
            formErrors: {
                name: "",
                email: "",
                phone: "",
            },
        }
    }

    componentDidMount(){

        const token = localStorage.usertoken;
        if (token){
            getProfile(token).then(res => {
                if (res) {
                    this.setState({
                        name: res.name,
                        email: res.email,
                        phone: res.phone,
                        isDisabled: true
                    })
                }
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
            --THÔNG TIN--
            Họ Tên: ${this.state.name}
            Email: ${this.state.email}
            Số điện thoại: ${this.state.phone}
            CMND: ${this.state.nID}
            Nơi đi: ${this.state.start}
            Nơi đến: ${this.state.end}
            Số ghế: ${this.props.DSGhe}
            Giá tiền: ${this.props.price}
            id: ${this.props.brand._id}
            `);
            const dataOrder = {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                nID: this.state.nID,
                start: this.state.start,
                end: this.state.end,
                seat: this.props.DSGhe,
                price: this.props.price,
                dayGo: this.props.dayGo,
                idRide: this.props.brand._id,
                maChuyen: this.props.brand.MaChuyen
            }
            this.props.history.push({
                pathname: `/thanhtoan`,
                search: `?noidi=${'HoChiMinh'}&noiDen=${this.props.brand.MaTuyen}`,
                state: { 
                    order: dataOrder
                }
            });
        } else {
            console.error("Thông tin không hợp lệ, vui lòng nhập lại");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 1 ? "Họ tên không được để trống" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "Email không hợp lệ";
                break;
            case "phone":
                formErrors.phone =
                    value.length !== 10 ? "Số điện thoại không hợp lệ" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    render() { 

        const { formErrors } = this.state;

        return (
            <div>
                <div id="info-header">
                    <span> Tp. Hồ Chí Minh</span>
                    <span> -{'>'} </span>
                    <span> {this.props.brand.TenTuyenDuong}</span>
                    <span style={{ float: 'right' }}> {moment(this.props.dayGo).format("DD/MM/YYYY")}</span>
                </div>
                <hr></hr>
                <form className="item-info-form" onSubmit={this.handleSubmit} noValidate> 
                    <div>
                        <label>Nhà xe:</label>
                        <h3>{this.props.brand.MaNhaXe}</h3>
                    </div>
                    <div>
                        <label>Ghế đã chọn:</label>
                        {this.props.DSGhe && this.props.DSGhe.map(( ghe, index) =>{
                            return <span className="h3" key={index}>{ghe}  </span>
                            
                        })
                        }
                    </div>
                    <div>
                        <label>Tổng tiền:</label>
                        <h3>{this.props.price && this.props.price} VNĐ</h3>
                    </div>
                    <div>
                        <label>Họ tên:</label>
                        <Input  type="text" name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                        />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.name}</span>
                        )}
                    </div>
                    <div>
                        <label>Email:</label>
                        <Input  type="text" name="email"
                                value={this.state.email} 
                                onChange={this.handleChange}
                                disabled={this.state.isDisabled}
                        />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </div>
                    <div>
                        <label>Số điện thoại:</label>
                        <Input  type="text" name="phone"
                                value={this.state.phone} 
                                onChange={this.handleChange}
                        />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.phone}</span>
                        )}
                    </div>
                    <div>
                        <label>Điểm đón:</label>
                        <Input type="text" name="start"
                                value={this.state.start} 
                                onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Điểm trả:</label>
                        <Input type="text" name="end" 
                                value={this.state.end}
                                onChange={this.handleChange}
                        />
                    </div>
                    <div className="btn-info-box">
                        <Button type="primary" htmlType="submit" id="btn-info">Thanh toán
                            <span className="tooltiptext">Vui lòng chọn ghế và điền đầy đủ thông tin trước khi thanh toán!</span>
                        </Button>
                    </div>
                </form >
            </div>
        )
    }
}

export default withRouter(InFo);