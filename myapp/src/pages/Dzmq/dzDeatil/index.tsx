import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Select, Steps } from 'antd';
 
import styles from './index.less'
const { Option } = Select;
const { Step } = Steps;

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
            name: '电子面签',
            url: '/dzmq',
        },
        {
            name: '自定义合同新建',
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

                <h3>自定义合同新建</h3>
                {/* <Steps current={1}>
                    <Step title="新增案件" />
                    <Step title="选择签约主体"/>
                    <Step title="签署合同" />
                    <Step title="确认推送" />
                </Steps> */}
                 <Steps current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
                <div>
                    <div></div>
                </div>
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