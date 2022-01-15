import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Select, Drawer } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styles from './index.less'
const { Option } = Select;
// const { Step } = Steps;

export default (props) => {
    const type = props.location?.query?.type || '';
    const [detailData, setDetailData] = useState({});
    const [active, setActive] = useState(0);
    useEffect(() => {
        console.log(props, '1231323');
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
        const temp = active + 1
        setActive(temp);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const handeleNext = () => {
        setActive(() => active + 1)
    }
    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>

                <h3>自定义合同新建</h3>
                {/* <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
    <Button icon={<UploadOutlined />}>Upload Directory</Button>
  </Upload> */}
                <div className={styles.contan}>
                    {
                        ['新增案件', '选择签约主体', '签署合同', '确认推送'].map((item, index) => (
                            <div className={`${styles.item} ${index === active ? styles.active : ''}`} >
                                <div className={styles.num}>{index + 1}</div>
                                <div className={styles.title}>{item}</div>
                                {
                                    index !== 3 ? <div className={styles.line}></div> : null
                                }

                            </div>
                        ))
                    }
                    <div></div>
                </div>
                {
                    (() => {
                        switch (active) {
                            case 0:
                                return <div className={styles.form}>
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 8 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="新增案件名称"
                                            name="status"
                                            rules={[{ required: true, message: '请输入' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="上传文件合同"
                                            name="date"
                                            rules={[{ required: true, message: '请输入' }]}
                                        >
                                            <input type="file" />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
                                            <Button type="primary" htmlType="submit">
                                                下一步
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>

                            case 1:
                                return <div className={styles.steptwo}>
                                    <Button type='primary' onClick={() => setVisible(true)} >添加签约主体</Button>
                                    <div className={styles.stept}>
                                        <img src="" alt="" />
                                        <div>
                                            <h4>个人主体</h4>
                                            <p>姓名：</p>
                                            <p>手机号：</p>
                                            <p>身份证号：</p>
                                            <p><a href="#">编辑</a> ｜ <a href="#">删除</a></p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button type='primary' style={{ marginRight: '8px' }} onClick={() => setActive(() => active - 1)}>上一步</Button>
                                        <Button type='primary' onClick={() => handeleNext()}>下一步</Button>
                                    </div>
                                </div>

                            case 2:
                                return <div></div>

                            case 3:
                                return <div></div>

                            default:
                                break;
                        }
                    })()
                }


            </Card>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    )
}