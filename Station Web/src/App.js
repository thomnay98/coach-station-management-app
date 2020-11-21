import React from 'react';
import { Layout } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainMenu from './pages/navbar/MainMenu';
import Footer from './pages/footer/Footer';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import HomePage from './pages/homepage/HomePage';
import SearchRidePage from './pages/searchridepage/SearchRidePage';
import BrandPage from './pages/brandpage/BrandPage';
import ContractPage from './pages/contractpage/ContractPage';
import CheckTicketPage from './pages/checkticketpage/CheckTicketPage';
import Booking from './pages/searchridepage/booking/Booking';
import PaymentPage from './pages/searchridepage/payment/PaymentPage';
import DetailBrand from './pages/brandpage/DetailBrand';
import Profile from './pages/accountpage/Profile';
import ListOder from './pages/accountpage/ListOder';
import OrderDetail from './pages/accountpage/OrderDetail';
import ChangePassword from './pages/accountpage/ChangePassword';


function App() {
  return (
    <Router>
      <Layout>
        <MainMenu />
        <Route exact={true} path="/" component={HomePage} />
        <section>
          <Switch>
            <Route exact path='/timchuyenxe/:tuyen' component={SearchRidePage} />
            <Route exact path='/hangxe' component={BrandPage} />
            <Route exact path='/lienhe' component={ContractPage} />
            <Route exact path='/kiemtrave' component={CheckTicketPage} />
            <Route exact path='/chonghe/:id' component={Booking} />
            <Route exact path='/chuyenxe/:id' component={Booking} />
            <Route exact path='/thanhtoan' component={PaymentPage} />
            <Route exact path='/hangxe/:idBrand' component={DetailBrand} />
            <Route exact path='/taikhoan' component={Profile} />
            <Route exact path='/donhang' component={ListOder} />
            <Route exact path='/donhang/:orderID' component={OrderDetail} />
            <Route exact path='/doimatkhau' component={ChangePassword} />
          </Switch>
        </section>
        <Route exact path='/dangky' component={Register} />
        <Route exact path='/dangnhap' component={Login} />
        <Footer />
      </Layout>    
    </Router>
  );
}

export default App;
