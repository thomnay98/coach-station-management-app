import React, { Component } from 'react';

import frCardImg from './../../../images/fr-card.PNG';
import bhCardImg from './../../../images/bh-card.PNG';

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        };
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="credit-box">
                <div className="credit-input">
                    <label>Số thẻ</label>
                    <input type="tel" 
                            pattern="[\d| ]{16}" 
                            className="cd-field1" 
                            required
                            placeholder="VD: 9555 9555 9555 9555" 
                    />
                    <label>Tên in trên thẻ</label>
                    <input type="text" 
                            className="cd-field1" 
                            required
                            placeholder="VD: NGUYEN VAN A" 
                    />
                    <label>Ngày hết hạn</label>
                    <input type="text" 
                            className="cd-field2" 
                            required
                            placeholder="MM/YY" 
                    />
                    <label>Mã bảo mật</label>
                    <input type="text" 
                            className="cd-field2" 
                            required
                            placeholder="VD: 123" 
                    />
                    <img src={bhCardImg} alt="CreditCard" />
                </div>
                <div className="credit-img">
                    <img src={frCardImg} alt="CreditCard" />
                </div>
            </div>      
        );
    }
}

export default CreditCard;