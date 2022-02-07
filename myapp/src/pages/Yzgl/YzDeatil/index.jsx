import React, { useState, useEffect, useRef } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import { yzDeatil } from '@/services/ant-design-pro/api';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Select, message,Radio } from 'antd';

import styles from './index.less'
const { Option } = Select;

export default (props) => {
    const type = props.location?.query?.type || '';
    const id = props.location?.query?.id || '';
    const data = props.location?.query?.data || '';
    const [detailData, setDetailData] = useState({});
    const [typeList, setTypeList] = useState([]);
    const formE = useRef(null);
    useEffect(() => {
        getList();
    }, []);


    const getList = async () => {
        // id && setDetailData(data)
        if (id) {
            const res = await yzDeatil({ id });
            console.log(res);
            setDetailData(res.data)
            if (!formE || !formE?.current) return;
            const { setFieldsValue } = formE.current;
            setFieldsValue(res)
        }
    }

    const urlArray = [
        {
            name: '印章管理',
            url: '/yzgl',
        },
        {
            name: id ? '修改印章' : '添加印章',
        }
    ];

    const onFinish = async (values) => {
        // console.log('Success:', values);
        if (!id) {
            const res = await getJsbc(values);
            if (res === 1) {
                message.success('添加成功')
            }
            props.history.push('/rygl');
        } else {
            values.id = detailData.id
            const res = await getJsxg(values);
            if (res === 1) {
                message.success('修改成功')
            }
            props.history.push('/rygl');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>

                <h3>{id ? '修改印章' : '添加印章'}</h3>
                {/* <div className={styles.form}>
                    <Form
                        ref={formE}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ dj: '否' }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                          <Form.Item
                            label="印章名称"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="印章编码"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="印章形状"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="印章类型"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="印章用途"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="公司名称"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="法人"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="公司地址"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="邮编"
                            name="access"
                            rules={[{ required: false, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                          <Form.Item
                            label="电话"
                            name="access"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item
                            label="电子邮件"
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
                            label="冻结"
                            name="dj"
                            rules={[{ required: false, message: '请输入' }]}
                        >
                             <Radio.Group>
                            <Radio value="是">是</Radio>
                            <Radio value="否">否</Radio>
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div> */}

            </Card>
        </>
    )
}