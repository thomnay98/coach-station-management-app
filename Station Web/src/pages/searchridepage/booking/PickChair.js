import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';
import moment from 'moment';
import io from 'socket.io-client';

const socket = io('http://api.banve.xyz', {
    path: '/socket',
});


const { TabPane } = Tabs;
class PickChair extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SoDoGhe: this.props.SoDoGhe,
            DSGhe: [],
            currentPage: 0,
            seconds: '00',
            minutes: '10'
        }
        
        this.MaChuyen = this.props.MaChuyen;
        const room = this.MaChuyen;
        socket.emit('join', { room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }


    componentWillMount() {
        socket.on('message', data => {
            console.log('room data');
            console.log(data);
        });

        socket.on("roomData", ({ users }) => {
            console.log('room data');
            console.log(users);

        });

        socket.on("chonGhe", ({ text, SoDoGhe }) => {
            console.log('chon ghe');
            console.log(SoDoGhe);

            this.setState({
                SoDoGhe : SoDoGhe
            })

        });
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        socket.on('sendMessage', res => {
            console.log('get message');
            console.log(res);
            this.setState({ chuyenxe: res.dataBoard })
        });
    }

    updateData = (ghe, soHang, soCot) => {
        let type = '';
        const check = this.state.DSGhe.findIndex(item => item === ghe.maGhe);
        if (check  > -1 ) {
            type = 'remove'
        } else {
            type = 'pick'
        }
        socket.emit("sendMessage",
            { room: this.MaChuyen, data: { ghe, soHang, soCot, type } },
            () => {
                console.log('send message thanh cong');
                this.handleChonGhe(ghe, soHang, soCot);
            }
        );
    }

    renderPage = (key) => {
        this.setState({
            currentPage: key
        })
    }

    renderColor(key) {
        switch (key) {
            case 0:
                return 'red'
            case 1:
                return 'white'
            case 2:
                return 'green'
            case 3:
                return '#888'
            case 4:
                return 'yellow'
            case 5:
                return ' blue'
            default:
                return 'red'
        }
    }

    renderSoDoGhe = (SoDoGhe) => {
        // console.log(SoDoGhe)
        return SoDoGhe.map((hangghe, soHang) => {
            return (
                <Row justify="space-around" id="chair" key={soHang}>
                    {
                        hangghe.map((ghe, soCot) => {
                            return (
                                <Col span={3.5} key={soCot} >
                                    {
                                        this.renderGhe(ghe, soHang, soCot)
                                    }
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        })
    }

    renderGhe = (ghe, soHang, soCot) => {
        
        if (!ghe.active)  {
            return (
                null
            )
        }
        // Render ghe duoc chon
        if ((this.state.DSGhe.findIndex(item => item === ghe.maGhe) > -1)) {
            //const holdingTime = ghe.thoiGianGiu - moment();
            
            return (
                <button type="button"
                    style={{
                        backgroundColor: this.renderColor(2)
                    }}
                    onClick={() => {
                        this.updateData(ghe, soHang, soCot);
                    }}
                >
                    <span className="holding-time">
                        {moment(ghe.thoiGianGiu).format('HH:mm:ss')}
                        <span className="tooltip-time">Thời gian giữ ghế đến {moment(ghe.thoiGianGiu).format('HH:mm:ss')}</span>
                    </span>
                    
                </button>
            )
        }
        // render ghe  trong
        if (ghe.status === 1) {
            return (
                <button type="button"
                    style={{
                        backgroundColor: this.renderColor(1)
                    }}
                    onClick={() => {
                        this.updateData(ghe, soHang, soCot);
                    }}
                >
                </button>
            )
        }
        // Render ghe dang chon
        if (ghe.status === 4
             && ghe.thoiGianGiu < moment().valueOf() 
        ) {
            return (
                <button type="button"
                    style={{
                        backgroundColor: this.renderColor(1)
                    }}
                    onClick={() => {
                        this.updateData(ghe, soHang, soCot);
                    }}
                >
                    
                </button>
            )
        }
        // Render ghe con lai
        return (
            <button type="button"
                style={{
                    backgroundColor: this.renderColor(ghe.status)
                }}
                onClick={() => this.handleChonGhe(ghe, soHang, soCot)}
                disabled
            >
            </button>
        )
    }


    handleChonGhe = (ghe, soHang, soCot) => {
        let DSGhe = this.state.DSGhe;
        let prices;
        const check = DSGhe.findIndex(item => item === ghe.maGhe);


        if (check > -1) {
            console.log('remove' + DSGhe);
            DSGhe.splice(check, 1);
            //prices = prices - parseInt(this.props.price);
        } else {
            console.log('push' + DSGhe);
            DSGhe.push(ghe.maGhe);
            //prices = prices + parseInt(this.props.price);
        }
        //console.log(DSGhe);
        for (let i = 0; i < DSGhe.length; i++) {
            prices = parseInt(this.props.price) * (i + 1);
        }
        this.setState({
            DSGhe,

        }, () => {
            // console.log(this.state.DSGhe);
        })
        this.props.getDSGhe(this.state.DSGhe);
        this.props.getPrice(prices);
    }

    render() {
        const SoDoGhe = this.state.SoDoGhe;

        return (
            <div>
                <Tabs defaultActiveKey="0" onChange={this.renderPage}>
                    <TabPane tab={<div id="tab"> TẦNG 1</div>} key="0">
                        {
                            this.renderSoDoGhe(SoDoGhe[0])
                        }
                    </TabPane>

                    <TabPane tab={<div id="tab"> TẦNG 2</div>} key="1">
                        {
                            this.renderSoDoGhe(SoDoGhe[1])
                        }
                    </TabPane>
                </Tabs>
                <Row justify="space-around" className="note">
                    <Col >
                        <span><button style={{ backgroundColor: "white" }} disabled></button> Ghế trống</span>
                    </Col>
                    <Col >
                        <span><button style={{ backgroundColor: "red" }} disabled></button> Ghế không bán</span>
                    </Col>
                    <Col >
                        <span><button style={{ backgroundColor: "#888" }} disabled></button> Ghế chưa bán</span>
                    </Col>
                </Row>
                <Row justify="space-around" className="note">
                    <Col >
                        <span><button style={{ backgroundColor: "yellow" }} disabled></button> Ghế đang giao dịch</span>
                    </Col>
                    {/* <Col >
                        <span><button style={{ backgroundColor: "white" }} disabled></button> Chỗ chặng dài hơn</span>
                    </Col> */}
                    <Col >
                        <span><button style={{ backgroundColor: "green" }} disabled></button> Ghế đang chọn</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PickChair;
