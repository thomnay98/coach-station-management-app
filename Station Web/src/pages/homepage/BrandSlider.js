import React, { Component } from 'react';
import { Card } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

import callApi from './../../utils/APIDrive';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1380 },
        items: 5
    },
    largeDesktop: {
        breakpoint: { max: 1380, min: 1080 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1080, min: 800 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

class BrandSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
        }
    }

    componentDidMount() {
        callApi('nhaxe?limit=1000', 'GET', this.state.filters).then(res => {
            this.setState({
                brands: res.data.data
            })
        })
    }

    render() {

        return (
            <div className="br-slider container">
                <div>
                    <h3 >HỆ THỐNG NHÀ XE UY TÍN</h3>
                </div>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {
                        this.state.brands &&
                        this.state.brands.map((brand, index) => {
                            return (
                                <Link key={index} to={`/hangxe/${brand.MaNhaXe}`}>
                                    <Card className="br-card" hoverable cover={<img alt="example" height="120" src={brand.hinh} />}>
                                        <h4>{brand.MaNhaXe}</h4>
                                    </Card>
                                </Link>
                            )
                        })
                    }
                </Carousel>;
            </div>
        );
    }
}

export default BrandSlider;