import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import { getJsbc, getJslb } from '@/services/ant-design-pro/api';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Select, message, } from 'antd';

import styles from './index.less'
const { Option } = Select;

export default (props) => {
    const type = props.location?.query?.type || '';
    const [detailData, setDetailData] = useState({});
    const [typeList, setTypeList] = useState([]);
    useEffect(() => {
        getList();
        async function getmenu() {
            const [statusData] = await Promise.all([
                getJslb(),
            ])
            console.log(changType(statusData));
            setTypeList(changType(statusData))
        }
        getmenu();
    }, []);

    function changType(value) {
        if (!Array.isArray(value)) return [];
        const tempData = [];
        value.map(ele => {
            tempData.push({ name: ele, value: ele });
        })
        return tempData;
    };
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

    const onFinish = async (values) => {
        // console.log('Success:', values);
        const res = await getJsbc(values);
        if (res === 1) {
            message.success('添加成功')
        }
        props.history.push('/rygl');
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
                            name="role"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select
                                placeholder="请选择"
                                // onChange={onGenderChange}
                                allowClear
                            >
                                {typeList?.map(item => {
                                    return <Option key={item.name} value={item.value}>{item.name}</Option>
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="账号"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="secret"
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