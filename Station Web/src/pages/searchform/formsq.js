import React, { Component } from 'react';
import './searchform.css';
import moment from "moment";
import { Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { withRouter } from 'react-router';

import callApi from '../../utils/APIDrive';


class SearchFormSq extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'asc',
      selectedPlaces: [],
      sltStarts: 'TP. HỒ CHÍ MINH',
      sltEnds: '',
      dayGo: '2020-09-06',
      value: '',
      noiDi : '',
      noiDen : '',
      ngayDi : moment(),
    }
  }

 

  componentDidMount() {
    callApi('tuyenduong?limit=500', 'GET', null).then(res => {
      this.setState({
        selectedPlaces: res.data.data
      })
    })
  }

  warning() {
    Modal.error({
      title: 'Lỗi khi tìm chuyến',
      content: 'Vui lòng chọn địa điểm đến trước khi tìm chuyến',
    });
  }

  render() {

    const {sortType} = this.state;

    const filteredPlaces = [...new Map(this.state.selectedPlaces.map(item => [item.MaDiaDiemDen, item])).values()];

    const sortedPlaces = filteredPlaces.sort((a, b) =>{
      const isReversed = (sortType === 'asc') ? 1 : -1;
      return isReversed * a.TenDiaDiemDen.localeCompare(b.TenDiaDiemDen)
    })

    return (
      <div className="s-search">
          <div>
            <label htmlFor="">
              <h4>Nơi đi:</h4>
            </label>
          <input className="select-form" name="sltStarts" value={this.state.sltStarts} disabled />
          </div>

          <div>
            <label htmlFor="">
              <h4>Nơi đến:</h4>
            </label>
            <select className="select-form"
                    placeholder="Chọn điểm đến"
                    name="sltEnds"
                    value={this.state.sltEnds}
                    onChange={event => this.setState({ sltEnds: event.target.value })}
                    >
                      <option>Điểm đến...</option>
                      {sortedPlaces.map(tuyen => (
                        <option value={tuyen.MaDiaDiemDen} key={tuyen._id}>
                          {tuyen.TenDiaDiemDen}
                        </option>
                    ))}
              </select>
          </div>
          <div>
            <label htmlFor="">
              <h4>Ngày đi:</h4>
            </label>
            <input className="select-form"
                    type="date" id="birthday" name="birthday"
                    value={this.state.dayGo}
                    onChange={event => this.setState({ dayGo: event.target.value})}
            />
          </div>
          <div>
            <Button 
              className="btn-search"
              onClick={() => {
                  this.state.sltEnds
                  ?
                    this.props.history.push({
                      pathname: `/timchuyenxe/${this.state.sltEnds}`,
                      search: `?noidi=${this.state.sltStarts}&noiDen=${this.state.sltEnds}&ngayDi=${this.state.dayGo}`,
                    })   
                  :  
                  this.warning()      
              }}
              type="primary" htmlType="submit" icon={<SearchOutlined style={{ fontWeight: "bold" }} />}>
              Tìm vé xe
            </Button>
          </div>
      </div>
    )
  }
}

export default withRouter(SearchFormSq);