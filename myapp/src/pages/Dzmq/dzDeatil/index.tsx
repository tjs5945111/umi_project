import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Select, } from 'antd';

import styles from './index.less'
const { Option } = Select;

export default (props) => {
    const type = props.location?.query?.type || '';
    const [detailData, setDetailData] = useState({});
    useEffect(() => {
        console.log(props);
    })

    const getList = () => {
        setDetailData({})
    }

    const urlArray = [
        {
            name: '人员列表',
            url: '/rygl',
        },
        {
            name: '添加人员',
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

                <h3>添加人员</h3>
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
                            label="角色"
                            name="status"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select
                                placeholder="请选择"
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="账号"
                            name="czy"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="date"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input.Password />
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