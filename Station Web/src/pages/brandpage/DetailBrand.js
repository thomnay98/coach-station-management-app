import React, { Component } from 'react';
import './brandpage.css';
import { Layout } from 'antd';

import Journeys from './Journeys';
import BrandInfo from './BrandInfo';

import callApiDr from './../../utils/APIDrive';
import callApiBk from './../../utils/APIBooking';

const { Content } = Layout;

class DetailBrand extends Component {

    constructor (props){
        super(props);
        this.state = {
            brands: [],
            chuyenXe: [],
        }
        this.getData()
    }

    getData = () =>{
        const { idBrand } = this.props.match.params

        callApiDr(`nhaxe?MaNhaXe=${idBrand}`, 'GET',  null).then(res => {
            this.setState({
                brands: res.data.data[0]
            })
            callApiBk(`chuyenxe?MaNhaXe=${res.data.data[0].MaNhaXe}`, 'GET', null).then(result => {
                this.setState({
                    chuyenXe: result.data.data
                })
            })
        })
    }

    render() {

        return (
            <div className="container">
                <Layout className="db-layout">
                    <Content height={'auto'}>
                        <div className="wrapper-brands">
                            <div className="brand-img">
                                <img src={this.state.brands.hinh} alt={this.state.brands.hinh} />
                            </div>
                            <BrandInfo brand={this.state.brands} />
                        </div>
                        <div>
                            <Journeys chuyenXe={this.state.chuyenXe} />
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default DetailBrand;