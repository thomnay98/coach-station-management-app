import React, { Component } from 'react';
import './srp.css';
import { Form, Table, Col, Button, Modal } from 'antd';
import { SwapRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from "moment";
import queryString from 'query-string';
import { withRouter } from 'react-router';

import callApiBk from './../../utils/APIBooking';
import callApiDr from './../../utils/APIDrive';

class DetailRides extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaces: [],
            sortType: 'asc',
            sltStarts: 'TP.HỒ CHÍ MINH',
            sltEnds: '',
            dayGo: '',
            value: '',
            isLoading: false,
            disabled: true,
            hasData: true,
            rides: [],
            noiDen: '',
            ngayDi: '',
            sltBrands: 'All',
            filterRides: []
        }
    }

    componentDidMount(){
        const filters = queryString.parse(this.props.location.search);
        this.setState({
            isLoading: true,
            hasData: false,
            sltEnds: filters.noiDen,
            dayGo: filters.ngayDi
        })
        callApiBk(`chuyenxe?start=${moment(filters.ngayDi).valueOf()}&end=123124125525215235&MaDiaDiemDen=${filters.noiDen}`, 'GET',).then(res => {
            this.setState({
                rides: res.data.data,
                isLoading: false,
                hasData: true,
            })
        })
    }

    componentWillMount() {
        callApiDr('tuyenduong?limit=500', 'GET', null).then(res => {
            this.setState({
                selectedPlaces: res.data.data,
            })
        })
    }

    warning() {
        Modal.error({
            title: 'Lỗi khi tìm chuyến',
            content: 'Vui lòng chọn địa điểm đến trước khi tìm chuyến',
        });
    }
 
    getChuyenXe = () =>{

        this.setState({ 
            isLoading: true,
            hasData: false,
         });
        callApiBk(`chuyenxe?start=${moment(this.state.dayGo).valueOf()}&end=123124125525215235&MaDiaDiemDen=${this.state.sltEnds}`, 'GET',).then(res => {
            this.setState({
                rides: res.data.data,
                isLoading: false,
                hasData: true,
            })
        })
       
    }

    getChuyenXeAgain = () => {
        this.props.history.push({
            pathname: `/timchuyenxe/${this.state.sltEnds}`,
            search: `?noidi=${this.state.sltStarts}&noiDen=${this.state.sltEnds}&ngayDi=${this.state.dayGo}`,
        })
        this.getChuyenXe()
    }

    renderData = (data) => {
        console.log(data)
        return data.map(ride => ({
            key: ride._id, 
            brands: ride.MaNhaXe, 
            starts: 'Bến xe Miền Đông', 
            time: (ride.GioDi.toString().length > 6
                ?
                moment(ride.GioDi).format("HH:mm")
                :
                ride.GioDi
            ), 
            ends: ride.TenTuyenDuong, 
            types: ride.MaLoaiGhe, 
            prices: ride.GiaVe, 
        }));
    }

    filterWithBrands = (e) => {
        const val = e.target.value
        this.setState({ sltBrands: val})
        console.log(val)
        if(val === 'All'){
            this.getChuyenXeAgain()
        }else{
        this.setState({
            isLoading: true,
            filterRides: this.state.rides.filter(ride => {
                return ride.MaNhaXe.includes(val)
            })
        }, () => setTimeout(() => {
                    this.setState({ isLoading: false})
            }, 500)
        )
        }
    }

    render() {
        const { sortType } = this.state;

        const filteredPlaces = [...new Map(this.state.selectedPlaces.map(item => [item.MaDiaDiemDen, item])).values()]

        const sortedPlaces = filteredPlaces.sort((a, b) => {
            const isReversed = (sortType === 'asc') ? 1 : -1;
            return isReversed * a.TenDiaDiemDen.localeCompare(b.TenDiaDiemDen)
        })

        const brands = this.state.rides.map(br => ({
            value: br.MaNhaXe, name: br.MaNhaXe
        }))

        const filterBrands = [...new Map(brands.map(item => [item.name, item])).values()]

        const sortedBrands = filterBrands.sort((a, b) => {
            const isReversed = (sortType === 'asc') ? 1 : -1;
            return isReversed * a.name.localeCompare(b.name)
        })

        const columns = [
            {
                title: 'HÃNG XE',
                dataIndex: 'brands',
                key: 'brands',
            },
            {
                title: 'BẾN ĐI',
                dataIndex: 'starts',
                key: 'starts',
            },
            {
                title: 'THỜI GIAN',
                key: 'time',
                render: (text, record) => (
                    <span>
                        <Col >{record.time}</Col>
                        <Col><SwapRightOutlined style={{ width: 40 }} /></Col>
                    </span>
                )
            },
            {
                title: 'BẾN ĐẾN',
                dataIndex: 'ends',
                key: 'ends',
            },
            {
                title: 'LOẠI XE',
                key: 'types',
                render: (text, record) => (
                    <Col >
                        {
                            record.types === "BED" &&
                            'Giường nằm'
                        }
                        {
                            record.types === "LYING" &&
                            'Ghế nằm'
                        }
                        {
                            record.types === "NORMAL" &&
                            'Ghế ngồi'
                        }
                    </Col>
                )
            },
            {
                title: 'GIÁ VÉ',
                key: 'prices',
                render: (text, record) => {
                    return (
                        <span>
                            <Col style={{ marginRight: 16, fontWeight: "bold" }}>{record.prices} VNĐ</Col>
                            <Col>
                                <Button style={{ backgroundColor: "#CC33FF", color: "white", fontWeight: "bold" }}>
                                    <Link
                                        to={{
                                            pathname: `/chonghe/${record.key}`,
                                            // search: `?chuyenxe=${record.key}`,
                                            // hash: "#the-hash",
                                            state: { dayGo: this.state.dayGo }
                                        }}

                                        style={{ color: "white" }}

                                    >Đặt vé</Link>
                                </Button>
                            </Col>
                        </span>
                    )
                }
            },
        ];

        // const filterRide = [];

        // if(this.state.sltBrands === 'All'){
        //     filterRide = this.renderData(this.state.rides);
        // }else{
        //     filterRide = this.renderData(this.state.rides).filter(ride => {
        //         return ride.MaNhaXe.includes(this.state.sltBrands)
        //     })
        // }

        return (
            <div>
                <div className="bg-grey search-page">
                    <Form className="wraper-f" onSubmit={this.handleSubmit}>
                        <div className="form-rec">
                            <Col span={6}>
                                <Form.Item label="Nơi đi">
                                    <input className="select-form" name="sltStarts" value={this.state.sltStarts} readOnly />
                                </Form.Item>
                            </Col>
                        </div>
                        <div className="form-rec">
                            <Col span={6}>
                                <Form.Item label="Nơi đến">
                                    <select className="select-form"
                                        name="sltEnds"
                                        value={this.state.sltEnds}
                                        onChange={event => this.setState({ sltEnds: event.target.value })}
                                    >
                                        {sortedPlaces.map(tuyen => (
                                            <option value={tuyen.MaDiaDiemDen} key={tuyen._id}>
                                                {tuyen.TenDiaDiemDen}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Item>
                            </Col>
                        </div>
                        <div className="form-rec">
                            <Col span={6}>
                                <Form.Item label="Ngày đi">
                                    <input className="select-form"
                                        type="date" id="birthday" name="birthday"
                                        value={this.state.dayGo}
                                        onChange={event => this.setState({ dayGo: event.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                        </div>
                        <div className="form-rec">
                            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} className="form-rec-btn"
                                onClick={() => {
                                    this.state.sltEnds
                                        ?
                                        this.getChuyenXeAgain()
                                        :
                                        this.warning()
                                }}
                            >
                                Tìm vé xe
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="filter-wrapper"> 
                    <select className="slt-filter"
                            name="sltBrand"
                            value={this.state.sltBrands}
                            onChange={event => this.filterWithBrands(event)}
                    >
                        <option value="All">TẤT CẢ</option>
                        {
                            sortedBrands.map(br => (
                                <option value={br.value} key={br.value}>{br.name}</option>
                            ))
                        }    
                    </select>
                </div>
                <div className="search-page">
                    <Table loading={this.state.isLoading} 
                        dataSource={this.state.hasData ? this.renderData(this.state.sltBrands === 'All' ? this.state.rides : this.state.filterRides) : null} 
                        onChange={this.handleChange}
                        columns={columns}
                    > 
                    </Table>
                </div>
            </div>
        );
    }
}

export default withRouter(DetailRides);