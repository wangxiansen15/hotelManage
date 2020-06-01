import React, { Component } from "react";
import TabItem from "./Component/Tabs/index";
import  Cpp  from './Component/OrderDetail/index';

class Order extends Component {
    render() {
        return (
            <div>
                <TabItem></TabItem>
                <Cpp />
            </div>
        );
    }
}

export default Order;