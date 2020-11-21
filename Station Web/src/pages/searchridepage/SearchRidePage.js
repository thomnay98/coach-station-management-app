import React, { Component } from 'react';
import './srp.css';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import DetailRides from './DetailRides';

class SearchRidePage extends Component {
    render() {

        return (
            <div className="bg-search-page container">
                <div className="search-page">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Trang chủ</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/timchuyenxe">Vé xe khách</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <DetailRides />
                </div>
            </div>
        );
    }
}

export default SearchRidePage;