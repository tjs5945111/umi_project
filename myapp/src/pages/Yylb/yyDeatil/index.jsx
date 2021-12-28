import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button,Radio, DatePicker } from 'antd';
import { getYyxq } from '@/services/ant-design-pro/api';

import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        getList()
      },[])

    const getList =async () => {
        const res =await getYyxq(1)
        console.log(res);
        setDetailData(res)
    }

    const urlArray = [
        {
            name: '预约列表',
            url: '/yylb',
        },
        {
            name: '预约详情',
        }
    ];

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>
                <h3>预约详情</h3>
                <div className={styles.textCo}>
                    <div><span>预约事项：</span>2131242323123</div>
                    <div><span>办理人姓名：</span>1m</div>
                    <div><span>申办人手机号：</span>213123123</div>
                    <div><span>申办时间：</span>132342423123</div>
                    <div><span>上门地址：</span>13123</div>
                    <div><span>状态：</span>13123</div>
                    <div><span>备注信息：</span>132324324234324324324123</div>
                </div>
                <h3>用户预约设置</h3>
                <div className={styles.form}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="预约状态"
                        name="status"
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>A</Radio>
                            <Radio value={2}>B</Radio>
                            <Radio value={3}>C</Radio>
                            <Radio value={4}>D</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="操作员"
                        name="czy"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="登记日期"
                        name="date"
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="确认日期"
                        name="qrrq"
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                       <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="备注信息"
                        name="bz"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                </div>
              
            </Card>
        </>
    )
}