import React, { Component } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';

const bank = [
    { id: 'TPB', name: 'TPBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/TPB.jpg', url: 'https://ebank.tpb.vn/retail/vX/login' },
    { id: 'MB', name: 'MBBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/MB.jpg', url:'https://www.mbbank.com.vn/home/ca-nhan' },
    { id: 'VTB', name: 'VietinBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/VTB.jpg', url: 'https://ebanking.vietinbank.vn/rcas/portal/web/retail/bflogin' },
    { id: 'VCB', name: 'Vietcombank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/VCB.jpg', url: 'https://vcbdigibank.vietcombank.com.vn/#/login?returnUrl=%2Fhome' },
    { id: 'SCB', name: 'SacomBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/SCB.jpg', url: 'https://www.isacombank.com.vn/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&LANGUAGE_ID=003' },
    { id: 'EIB', name: 'EximBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/EIB.jpg', url: 'https://ebanking.eximbank.com.vn/ibcn/faces/login.jspx;jsessionid=dpb2fVYLzLJxKSn4zQx9hTvq18JtFyY1Qn0prkZxpKRZLNlD1QdZ!157349025!-1694705465?_adf.ctrl-state=4tuqmnfif_4&_afrLoop=120608199830000' },
    { id: 'BIDV', name: 'BIDV', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/BIDV.jpg', url: 'https://www.bidv.vn:81/iportalweb/iRetail@1' },
    { id: 'DAB', name: 'DongAbank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/DAB.jpg', url: '' },
    { id: 'ACB', name: 'AChauBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/ACB.jpg', url: '' },
    { id: 'TCB', name: 'Techcombank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/TCB.jpg', url: '' },
    { id: 'VPB', name: 'VPBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/VPB.jpg', url: '' },
    { id: 'VIB', name: 'VIBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/VIB.jpg', url: '' },
    { id: 'HDB', name: 'HDBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/HDB.jpg', url: '' },
    { id: 'OJB', name: 'OJBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/OJB.jpg', url: '' },
    { id: 'SHB', name: 'SHBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/SHB.jpg', url: '' },
    { id: 'LPB', name: 'LPBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/LPB.jpg', url: '' },
    { id: 'SGB', name: 'SGBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/SGB.jpg', url: '' },
    { id: 'BVB', name: 'BVBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/BVB.jpg', url: '' },
    { id: 'VRB', name: 'VRBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/VRB.jpg', url: '' },
    { id: 'KLB', name: 'KLBank', img: 'https://salt.tikicdn.com/assets/img/zalopaygw/KLB.jpg', url: '' },
];

class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isClicked: '',
        }
    }

    pickBank = (isClick, url) => {
        this.setState({
            isClicked: isClick,
        })
        this.props.getUrlB(url)
    }

    render() {
        return (
            <ul className="item-bank">
                { bank.map((b) => {
                    return (
                        <li key={b.id} onClick={() => this.pickBank(b.id, b.url)}
                        >
                            <CheckCircleTwoTone className="check-bank" twoToneColor="#52c41a" 
                                                hidden={ this.state.isClicked === b.id ? false : true }
                            />
                            <img src={b.img} alt={b.name}></img>
                        </li>
                )})}
            </ul>
        );
    }
}

export default Bank;