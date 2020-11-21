import React, { Component } from 'react';
import './checkticket.css'
import { Layout, Input, Button } from 'antd';
import callApi from './../../utils/APIBooking';

import InfoTicket from './InfoTicket';

const { Sider, Content } = Layout;

class CheckTicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: null,
            loading: false,
            value: ''
        }
    }

    onChangeHandler = async e => {
        this.setState({ value: e.target.value });
    };

    handleSearch = (value) => {
        callApi(`vexe?CodeVe=${value}`, 'GET', null)
            .then(result => {
                this.setState({
                    tickets: result.data.data[0]
                })
            })
    }

    render() {

        console.log("data: " + this.state.tickets)

        return (
            <Layout className="container">
                <Sider className="sider-layout-brand" width={250} height={'auto'}>
                    <div className="form-check">
                        <label htmlFor="code">Kiểm tra vé</label>
                        <Input placeholder="Nhập mã vé"
                            type="text" width={'50%'} name="fullName" noValidate
                            value={this.state.value}
                            onChange={e => this.onChangeHandler(e)}
                        />
                        <Button
                            type="dashed"
                            htmlType="submit"
                            className="btn-check"
                            onClick = {() => { 
                                this.handleSearch(this.state.value)
                            }}
                        >Kiểm tra</Button>
                    </div>
                </Sider>
                <Content>
                    <div>
                        {this.state.tickets === null
                        ?
                            <h1>Không có dữ liệu</h1>
                        :
                            <div>
                                <h1>Thông tin vé</h1>
                                <InfoTicket tickets={this.state.tickets} />
                            </div>
                        }
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default CheckTicketPage;