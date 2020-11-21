import React, { Component } from 'react';
import { Layout, List, Card } from 'antd';
import { Link } from 'react-router-dom';

import SearchFormSq from '../searchform/formsq';
import callApi from './../../utils/APIDrive';

const { Sider, Content } = Layout;

class BrandPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
        }
    }

    componentDidMount(){
        callApi('nhaxe?limit=1000', 'GET',  this.state.filters).then(res => {
          this.setState({
            brands: res.data.data
          })
        })
    }

    render() {

        var data = (this.state.brands.map(dt => ({
            id: dt.MaNhaXe, name: dt.TenNhaXe, image: dt.hinh
          })));

        return (
            <Layout className="container db-layout">
                <Sider className="sider-layout-brand" width={350} height={'auto'}><SearchFormSq /></Sider>
                <Content>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 2,
                            xl: 2,
                            xxl: 3,
                        }}
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <Link to={`/hangxe/${item.id}`}>
                                <Card style={{ height: 300 }} hoverable cover={<img style={{ height: 200 }} alt="example" src={item.image} />}>
                                        <h3>{item.name}</h3>
                                </Card>
                            </Link>
                        </List.Item>
                        )}
                    />,
                </Content>
            </Layout>
        );
    }
}

export default BrandPage;