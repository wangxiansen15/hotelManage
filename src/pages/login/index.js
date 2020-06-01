import React, {Component} from 'react';
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import './login.css';
import axios from 'axios';
import $ from 'jquery';
import {actionCreators3} from "./store";
import { Redirect } from 'react-router-dom'


class Login extends Component {

    state = {
        login: false,
        loginfalse: false
    };

    render() {
        const { login, loginfalse } = this.state;
        if (login === true) {
            return <Redirect to='/index' />
        }
        if (loginfalse === true) {
            return <Redirect to='/' />
        }
        const onFinish = values => {
            var d = {
                id: values.Id,
                password: values.password,
                code: values.Code
            };
            d = JSON.stringify(d);
            const { updownLogin } = this.props;
            const _this = this;
            $.ajax({
                type: 'POST',
                url:'http://116.85.12.238:8080/aihotel/manager/login',
                contentType: 'application/json;charset=UTF-8',
                xhrFields:{
                    withCredentials:true
                },
                data: d,
                success: function (res) {
                    if (res.status == 0) {
                        message.success("登录成功");
                        updownLogin(res.hotelId,values.Id);
                        _this.setState({
                            login: true
                        })
                    } else if (res.status == -1) {
                        message.error("用户名或密码错误");
                        _this.setState({
                            loginfalse: true
                        })
                    } else if (res.status == -2) {
                        message.error("用户名未填写验证码");
                        _this.setState({
                            loginfalse: true
                        })
                    } else if (res.status == -3) {
                        message.error("验证码错误");
                        _this.setState({
                            loginfalse: true
                        })
                        window.location.href='./'
                    }  else {
                        message.error("验证码获取异常");
                        _this.setState({
                            loginfalse: true
                        })
                    }
                },
                error: function (jqXHR) {
                    message.error("登录失败");
                    _this.setState({
                            loginfalse: true
                        })
                }
            });
        };
        return(
            <Card title={'酒店管理系统'} style={{width:'30%', marginLeft: '30%',marginTop: '100px'}}>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{
                        width:'80%',
                        margin: '0 auto',
                    }}
                >
                    <Form.Item
                        name="Id"
                        rules={[{ required: true, message: 'Please input your Id!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Id" autocomplete="off"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            autocomplete="off"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                    >
                        <Form.Item
                            name="Code"
                            noStyle
                        >
                            <Input
                                type="text"
                                placeholder="Code"
                                style={{width:"50%"}}
                                autocomplete="off"
                            />
                        </Form.Item>
                        <span className="ant-form-text"><img src="http://116.85.12.238:8080/aihotel/manager/imageCode?0" alt="" onClick={(e) => {
                            var a = e.target.src.split('?');
                            var b = Number(a[1]) + 1;
                            b = 'http://116.85.12.238:8080/aihotel/manager/imageCode?' + b;
                            e.target.src = b;
                        }}/></span>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" noStyle>
                            <Checkbox defaultChecked={false}>记住我</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

const mapDispatch = (dispatch) => ({
    updownLogin (id,mid) {
        dispatch(actionCreators3.updownLogin(id,mid));
    }
});

export default connect(null, mapDispatch)(Login);