import '../srp.css';
import React, { Component } from 'react';

import InFo from './InFo';
import PickChair from './PickChair';
import callApi from '../../../utils/APIBooking';


class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MaChuyen: this.props.match.params,//props.location.pathname.split("/chonghe/")[1],
            dayGo: '',
            chuyenXe: null,
            SoDoGhe: null,
            DSGhe: [],
            prices: null,
        }
        this.getData();
    }

    getData = () => {
        const { id } = this.props.match.params;
        const { dayGo } = this.props.location.state;
        
        callApi(`chuyenxe/${id}`).then(res => {
            console.log(res.data.data);
            this.setState({
                chuyenXe: res.data,
                SoDoGhe: res.data.SoDoGhe,
                dayGo: dayGo
            }, () => {
                console.log(this.state);
            })
        })
    }

    callBackDSGhe = (DSGhe) => {
        this.setState({
            DSGhe: DSGhe
        })
    }

    getPrice = (price) => {
        this.setState({
            prices: price
        })
    }
    
    render() {

        return (
            <div className="bg-img">
                <div className="booking container">
                    <div className="booking-bg wraper-b">
                        <div className="pickchair">
                            {
                                this.state.SoDoGhe &&
                                <PickChair
                                    SoDoGhe={this.state.SoDoGhe}
                                    getDSGhe={this.callBackDSGhe}
                                    price={this.state.chuyenXe.GiaVe}
                                    getPrice={this.getPrice}
                                    MaChuyen={this.state.MaChuyen}
                                />
                            }
                        </div>
                        <div className="info">
                        {
                            this.state.chuyenXe &&
                            <InFo brand={this.state.chuyenXe} DSGhe={this.state.DSGhe} price={this.state.prices} dayGo={this.state.dayGo} />
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Booking;