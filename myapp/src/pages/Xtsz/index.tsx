import React, { useState, useEffect } from 'react';
import { Card, message, Tabs } from 'antd';
import Yysz from './yysz';
import Jesz from './jesz';

import styles from './index.less';
const { TabPane } = Tabs;

export default () => {
    const [tenantList, setTenantList] = useState([]);
    useEffect(() => {
        // getList();
    }, []);

    function callback(key) {
        console.log(key);
    }

    return (
        <Card bordered={false}>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="预约设置" key="1">
                    <div style={{ width: '70%' }}>
                        <Yysz />
                    </div>
                </TabPane>
                <TabPane tab="金额设置" key="2">
                    <div style={{ width: '70%' }}>
                        <Jesz />
                    </div>
                </TabPane>
            </Tabs>
        </Card>
    )
}