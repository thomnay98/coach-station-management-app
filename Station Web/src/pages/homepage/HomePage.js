import './homepage.css'
import React, { Component } from 'react';
import { Row } from 'antd';
import FormSq from '../searchform/formsq';
import HomeCard from './HomeCard';
import BigCityCard from './BigCityCard';
import BrandSlider from './BrandSlider';

class HomePage extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#F8F8FF"}}>
                <div className="bg-form" >
                    <Row className="container">
                        <FormSq />
                    </Row>
                </div>
                <div>
                    <HomeCard />
                </div>
                <div className="bg-grey">
                    <BigCityCard />
                </div>
                <div>
                    <BrandSlider />
                </div>
            </div>
        );
    }
}

export default HomePage;