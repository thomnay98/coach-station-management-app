import React, { Component } from 'react';
import { Card } from 'antd';
import { CrownOutlined, ScheduleOutlined, DollarOutlined } from '@ant-design/icons';

class HomeCard extends Component {
    render() {
        return (
            <div className="container">
                <div className="wraper">
                    <Card className="card-sg" hoverable>
                        <CrownOutlined className="icon-sg" />
                        <h3>HÃNG XE UY TÍN</h3>
                        <p>Vivuve cung cấp vé xe của các hãng xe uy tín, đã được thị trường công nhận</p>
                    </Card>
                    <Card className="card-sg" hoverable>
                        <ScheduleOutlined className="icon-sg" />
                        <h3>GIỮ CHỖ 100%</h3>
                        <p>Mọi vé xe khi mua qua VIVUVE sẽ được giữ chỗ 100%</p>
                    </Card>
                    <Card className="card-sg" hoverable>
                        <DollarOutlined className="icon-sg" />
                        <h3>GIÁ VÉ RẺ NHẤT</h3>
                        <p>Giá vé tại VIVUVE luôn luôn thấp hơn hoặc bằng giá vé chính hãng của hãng xe </p>
                    </Card>
                </div>
            </div>
        );
    }
}

export default HomeCard;