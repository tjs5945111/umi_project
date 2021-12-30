import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button,Radio, DatePicker } from 'antd';
import { getYyxq,yyzt } from '@/services/ant-design-pro/api';
import moment from 'moment';

import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    const detailId = props.location?.query?.id || '';
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        getList()
      },[])

    const getList =async () => {
        const res =await getYyxq(detailId)
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

    const onFinish = async (values) => {
        values.reserveId=detailData.id;
        values.confirmDate =moment(values.confirmDate).format('YYYY-MM-DD hh:mm:ss')
        values.registryDate =moment(values.registryDate).format('YYYY-MM-DD hh:mm:ss')
        const res =await yyzt(values);
        if (res === 1) {
            message.success('设置成功')
        }
        props.history.push('/yylb');
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
                    <div><span>预约事项：</span>{detailData.matter}</div>
                    <div><span>办理人姓名：</span>{detailData.name}</div>
                    <div><span>申办人手机号：</span>{detailData.phone}</div>
                    <div><span>申办时间：</span>{detailData.gmtCreate}</div>
                    <div><span>上门地址：</span>{detailData.detailAddress}</div>
                    <div><span>状态：</span>{detailData.status}</div>
                    <div><span>备注信息：</span>{detailData.remark}</div>
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
                            <Radio value="待处理">待处理</Radio>
                            <Radio value="处理中">处理中</Radio>
                            <Radio value="已完成">已完成</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="操作员"
                        name="operator"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="登记日期"
                        name="registryDate"
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="确认日期"
                        name="confirmDate"
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                       <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="备注信息"
                        name="remark"
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