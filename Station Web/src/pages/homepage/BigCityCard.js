import React, { Component } from 'react';
import { Card } from 'antd';
import moment from "moment";
import { withRouter } from 'react-router';
import hnimg from '../../images/Ha-Noi.jpg';
import dnimg from '../../images/da-nang.jpg';
import dlimg from '../../images/da-lat.jpg';
import ntimg from '../../images/nha-trang.jpg';
import vtimg from '../../images/vung-tau.jpg';
import ctimg from '../../images/can-tho.jpg';

class BigCityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sltStarts: 'TP. HỒ CHÍ MINH',
            sltEnds: [ 'HNO', 'DNG', 'LDO', 'KHO', 'BRI', 'CTO' ],
            dayGo: moment().format('YYYY-MM-DD'),
        }
    }

    handleSubmit = (num) =>{
        setTimeout(() => {
            this.props.history.push({
                pathname: `/timchuyenxe/${this.state.sltEnds[num]}`,
                search: `?noidi=${this.state.sltStarts}&noiDen=${this.state.sltEnds[num]}&ngayDi=${this.state.dayGo}`,
            })
        }, 500)
    }

    render() {
        return (
            <div className="bc-card container">
                <div>
                    <h3>CÁC CHUYẾN PHỔ BIẾN</h3>
                </div>
                <div className="wraper">
                    <Card className="bc-card-item"
                        hoverable
                        cover={<img alt="example" src={hnimg} height="250" />}
                        onClick={() => { this.handleSubmit(0)}}
                    >
                        <h4>Chuyến đến: HÀ NỘI</h4>
                    </Card>
                    <Card className="bc-card-item"
                        hoverable
                        cover={<img alt="example" src={dnimg} height="250" />}
                        onClick={() => { this.handleSubmit(1) }}
                    >
                        <h4>Chuyến đến: ĐÀ NẴNG</h4>
                    </Card>
                    <Card className="bc-card-item"
                        hoverable
                        cover={<img alt="example" src={dlimg} height="250" />}
                        onClick={() => { this.handleSubmit(2) }}
                    >
                        <h4>Chuyến đến: LÂM ĐỒNG</h4>
                    </Card>
                    <Card className="bc-card-item"
                        hoverable
                        cover={<img alt="example" src={ntimg} height="250" />}
                        onClick={() => { this.handleSubmit(3) }}
                    >
                        <h4>Chuyến đến: KHÁNH HÒA</h4>
                    </Card>
                    <Card className="bc-card-item"
                        hoverable
                        cover={<img alt="example" src={vtimg} height="250" />}
                        onClick={() => { this.handleSubmit(4) }}
                    >
                        <h4>Chuyến đến: BÀ RỊA VŨNG TÀU</h4>
                    </Card>
                    <Card className="bc-card-item"
                        hoverable
                        cover={<img alt="example" src={ctimg} height="250" />}
                        onClick={() => { this.handleSubmit(5) }}
                    >
                        <h4>Chuyến đến: CẦN THƠ</h4>
                    </Card>
                </div>
                <br/><br/>
            </div>
        );
    }
}

export default withRouter(BigCityCard);