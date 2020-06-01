import React from 'react';
import './css.css';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Statistic, Row, Col, Dropdown   } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    BarChartOutlined,
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import img from '../../static/touxiang.png';
import CommodityList from "../../pages/commodity";
import Order from "../../pages/order";
import Comment1 from "../../pages/comment";
import BaseInformation from "../../pages/baseInformation";
import NewCommodity from "../../pages/newCommodity";
import CommodityDetail from "../../pages/commodityDetail";
import Coupon from "../../pages/Coupon";
import Goods from "../../pages/Goods";
import NewCoupon from "../../pages/newCoupon";
import Login from "../../pages/login";
import Product from "../../pages/product";
import CommentDetail from "../../pages/commentDetail";
import FoodOrder from "../../pages/foodOrder";
import { connect } from 'react-redux';
import { Lifecycle } from 'react-router';
import TenantInfo from '../../pages/tenantInfo';
import Index from "../../pages/index";
import {actionCreators3} from "../../pages/login/store";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



class Nav extends React.Component {
    state = {
        login: false,
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    componentWillReceiveProps(nextProps,nextContext){
        let self = this;

        setTimeout(function(){
            self.setState({
                login: nextProps.login,
            })

        },0)

    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={this.props.changeLogin}>
                    <Link to='/'>
                        {this.state.login ? '退出' : '请登录'}
                    </Link>
                </Menu.Item>
            </Menu>
        );
        function ticking(){
            document.getElementById('time').innerHTML = new Date().toLocaleTimeString();
        }
        setInterval(ticking,1000);
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="0">
                            <Link to='/index'>
                                <WindowsOutlined />
                                <span>首页</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="1" title={
                            <span>
                                <BarChartOutlined />
                                 <span>酒店信息</span>
                            </span>
                        }>
                            <Menu.Item key="11">
                                <Link to='/baseInformation'>
                                    <span>酒店基本信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="12">
                                <Link to='/commodity'>
                                    <span>商品信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="13">
                                <Link to='/order'>
                                    <span>订单信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="14">
                                <Link to='/tenantInfo'>
                                    <span>房客信息</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="2" title={
                            <span>
                                <DesktopOutlined />
                                <span>酒店服务</span>
                            </span>
                        }>
                            <Menu.Item key="21">
                                <Link to='/coupon'>
                                    <span>优惠劵</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="22">
                                <Link to='/goods'>
                                    <span>货品类别</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="23">
                                <Link to='/product'>
                                    <span>货品</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="24">
                                <Link to='/foodOrder'>
                                    <span>餐饮订单</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3">
                            <Link to='/comment'>
                                <PieChartOutlined />
                                <span>用户评价</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{background:'#F5F5F5'}}>
                    <Header className="site-layout-background" style={{ paddingLeft: '20px' }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Dropdown overlay={menu}>
                            <Avatar size="large" icon={<UserOutlined />} style={{float: 'right',marginTop:'10px'}} src={this.state.login ? img : null} onClick={e => e.preventDefault()}/>
                        </Dropdown>
                            <span style={{float:'right',marginRight:'100px'}} id='time'>
                            {new Date().toLocaleTimeString()}
                        </span>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            overflow: 'auto',
                            background:'#F5F5F5'
                        }}
                    >
                        <Route path='/commodity' exact component={this.state.login ? CommodityList : Login} ></Route>
                        <Route path='/order' exact component={this.state.login ? Order : Login }></Route>
                        <Route path='/comment' exact component={this.state.login ? Comment1 : Login }></Route>
                        <Route path='/baseInformation' exact component={this.state.login ? BaseInformation : Login }></Route>
                        <Route path='/newCommodity' exact component={this.state.login ? NewCommodity : Login }></Route>
                        <Route path='/commodityDetail' exact component={this.state.login ? CommodityDetail : Login }></Route>
                        <Route path='/coupon' exact component={this.state.login ? Coupon : Login }></Route>
                        <Route path='/goods' exact component={this.state.login ? Goods : Login }></Route>
                        <Route path='/newCoupon' exact component={this.state.login ? NewCoupon : Login }></Route>
                        <Route path='/' exact component={Login}></Route>
                        <Route path='/product' exact component={this.state.login ? Product : Login}></Route>
                        <Route path='/tenantInfo' exact component={this.state.login ? TenantInfo : Login}></Route>
                        <Route path='/index' exact component={this.state.login ? Index : Login}></Route>
                        <Route path='/commentDetail' exact component={this.state.login ? CommentDetail : Login}></Route>
                        <Route path='/foodOrder' exact component={this.state.login ? FoodOrder : Login}></Route>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapState = (state) => ({
    login: state.getIn(['login', 'Login'])
});

const mapDispatch = (dispatch) => ({
    changeLogin() {
        dispatch(actionCreators3.changeLogin());
    }
});

export default connect(mapState, mapDispatch)(Nav);


