import React, { useState, useEffect, useRef } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Radio, DatePicker, message } from 'antd';
import { getYyxq, yyzt } from '@/services/ant-design-pro/api';
import moment from 'moment';

import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    const detailId = props.location?.query?.id || '';
    const [detailData, setDetailData] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [statusValue, setStatusValue] = useState('');
    const formE = useRef(null);

    useEffect(() => {
        getList(detailId)
    }, [])

    const getList = async (detailId) => {
        const res = await getYyxq(detailId)
        console.log(res);
        var moments = res.reserveSetVO?.registryDate ? moment(res.reserveSetVO?.registryDate, 'YYYY-MM-DD HH:mm:ss') : undefined;
        // debugger
        let temp = {
            status: res.status,
            registryDate: moments,
            operator: res.reserveSetVO?.operator,
            remark: res.reserveSetVO?.remark,
        }
        // res.status='已完成'
        setStatusValue(res.status)
        if (res.status === '待处理') {
            temp.operator = window.user
        }
        if (!formE || !formE?.current) return;
        const { setFieldsValue } = formE.current;
        setFieldsValue(temp)
        // setInitialValues({
        //     status: res.status,
        //     registryDate: res.reserveSetVO?.registryDate,
        //     operator: res.reserveSetVO?.operator,
        //     remark: res.reserveSetVO?.remark,
        // })
        setDetailData(res);
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
        values.reserveId = detailData.id;
        values.confirmDate = moment(values.confirmDate).format('YYYY-MM-DD hh:mm:ss')
        values.registryDate = moment(values.registryDate).format('YYYY-MM-DD hh:mm:ss')
        const res = await yyzt(values);
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
                    {/* <div><span>操作员：</span>{detailData.reserveSetVO?.operator || ''}</div>
                    <div><span>操作员操作时间：</span>{detailData.reserveSetVO?.registryDate || ''}</div> */}
                    <div><span>状态：</span>{detailData.status}</div>
                    <div className={styles.bz}><span>备注信息：</span>{detailData.remark}</div>
                </div>
                <h3>用户预约设置</h3>
                <div className={styles.form}>
                    <Form
                        name="basic"
                        ref={formE}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={initialValues}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                      

                        <Form.Item
                            label="操作员"
                            name="operator"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="登记日期"
                            name="registryDate"

                            rules={[{ required: true, message: '请选择时间' }]}
                        >
                            <DatePicker disabled={statusValue === '处理中' || detailData.status === '已完成' || statusValue === '已完成'} showTime style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="确认日期"
                            name="confirmDate"
                            rules={[{ required: true, message: '请选择时间' }]}
                        >
                            <DatePicker disabled={detailData.status === '已完成' || statusValue === '已完成'} showTime style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="备注信息"
                            name="remark"
                            rules={[{ required: false, message: '请输入' }]}
                        >
                            <Input.TextArea disabled={detailData.status === '已完成' || statusValue === '已完成'} />
                        </Form.Item>
                        <Form.Item
                            label="预约状态"
                            name="status"
                            rules={[{ required: true, message: '请选择' }]}

                        >
                            <Radio.Group onChange={(v) => {
                                setStatusValue(v.target.value)
                            }}

                            >
                                <Radio disabled={detailData.status === '处理中' || detailData.status === '已完成' || statusValue === '处理中' || statusValue === '已完成'} value="待处理">待处理</Radio>
                                <Radio disabled={detailData.status === '已完成' || statusValue === '已完成'} value="处理中">处理中</Radio>
                                <Radio value="已完成">已完成</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" disabled={detailData.status === '已完成'}>
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Card>
        </>
    )
}