import React, { Component } from 'react';
import { Table, Col } from 'antd';
import moment from "moment";

const { Column } = Table;

class Journeys extends Component {

    render() {

        const { chuyenXe } = this.props

        return (
            <div className="journey">
                <h2>Hành trình</h2>
                <Table dataSource={chuyenXe} pagination={false} size="middle">
                    <Column title="Tuyến đường" dataIndex="routes" key="routes" 
                        render={(text, record) => (
                            <span>Hồ Chí Minh - {record.TenDiaDiemDen}</span>
                        )} >
                    </Column>
                    <Column title="Giờ đi" dataIndex="times" key="times"
                        render={(text, record) => (
                            <span>
                                {
                                    record.GioDi.toString().length > 6
                                    ?
                                    moment(record.GioDi).format("HH:mm")
                                    :
                                    record.GioDi
                                }
                            </span>
                        )}/>
                    <Column title="Điểm đi" dataIndex="starts" key="starts"
                        render={(text, record) => (
                            <span>Bến xe Miền Đông</span>
                        )}/>
                    <Column title="Điểm đến" dataIndex="time" key="time"
                        render={(text, record) => (
                            <span>
                                <Col >{record.TenTuyenDuong}</Col>
                            </span>
                        )}/>MaTuyen
                    <Column title="Loại xe" dataIndex="types" key="types"
                        render={(text, record) => (
                            <span>
                                {
                                    record.MaLoaiGhe === "BED" &&
                                    'Giường nằm'
                                }
                                {
                                    record.MaLoaiGhe === "LYING" &&
                                    'Ghế nằm'
                                }
                                {
                                    record.MaLoaiGhe === "NORMAL" &&
                                    'Ghế ngồi'
                                }
                            </span>
                        )}/>
                </Table>
            </div>
        );
    }
}

export default Journeys;