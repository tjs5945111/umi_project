import React, { useState, useEffect, useRef } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'
import { getZjxq, downLoadFun, getLx, czsz } from '@/services/ant-design-pro/api';

import { Card, Select, Input, Form, message, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { sizeChange } from '@/util/util';
import styles from './index.less'

const { Option } = Select;

export default (props) => {
    const type = props.location?.query?.type || '';
    const edit = props.location?.query?.edit || '';
    const detailId = props.location?.query?.id || '';
    const status = props.location?.query?.status || '';
    const certificateTotalAmount = props.location?.query?.num || '';
    const formE = useRef(null);
    const videoEl = useRef(null);
    const [detailData, setDetailData] = useState({});
    const [statusList, setStatusList] = useState([]);
    const [money, setMoney] = useState('');
    // const [money, setMoney] = useState(detailData.);
    useEffect(() => {
        console.log(detailId);
        getList(detailId)
    }, [])

    const getList = async () => {
        const res = await getZjxq(detailId)
        console.log(res);
        setDetailData(res)
        if (edit) {
            const dat = await getLx();
            setStatusList(changType(dat));
            if (!formE || !formE?.current) return;
            const { setFieldsValue } = formE.current;
            setFieldsValue({
                status,
                certificateTotalAmount,
            })
        }
        videoEl?.current?.load();
    }
    function changType(value) {
        if (!Array.isArray(value)) return [];
        const tempData = [];
        value.map(ele => {
            tempData.push({ name: ele, value: ele });
        })
        return tempData;
    };
    const urlArray = [
        {
            name: '证据列表',
            url: '/manager/zjlb',
        },
        {
            name: '证据详情',
        }
    ];
    const downLoad = async () => {
        const anchor = document.createElement('a')
        anchor.href = `/manager/forensics.zip?notarizationNumber=${detailData.notarizationNumber}`
        anchor.download = `${detailData.notarizationNumber}.zip`
        anchor.click();
        // const res = await downLoadFun('c1322e6d-119f-41e8-ba76-c7be01183b84')
        // const res =await downLoadFun(detailData.notarizationNumber)
        // console.log(res);
    }
    const onFinish = async (values) => {
        console.log('Success:', values);
        values.notarization_number = detailData.notarizationNumber
        const res = await czsz(values);
        if (res.code === 'OK') {
            message.success('修改成功');
            props.history.push('/manager/zjlb');
        }
    }

    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>
                {edit === 'true' ? <>
                    <Form
                        ref={formE}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="状态"
                            name="status"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Select
                                placeholder="请选择"
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value='已出证未付款'>已出证未付款</Option>
                                {/* {statusList?.map(item => {
                                    return <Option key={item.name} value={item.value}>{item.name}</Option>
                                })} */}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="金额"
                            name="certificateTotalAmount"
                            rules={[{ required: true, message: '请输入' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                修改
                            </Button>
                        </Form.Item>
                    </Form>
                </> : <>
                    <div className={styles.title}>
                        <img src={imgs} alt="" />
                        <p><span>证据编号：</span>{detailData.notarizationNumber}</p>
                    </div>
                    <div className={styles.con}>
                        <div><span>证据状态：</span>{detailData.status}</div>
                        <div className={styles.textCo}>
                            <div><span>取证名称：</span>{detailData.fileName}</div>
                            <div><span>取证类型：</span>{detailData.notarizationWay}</div>
                            <div><span>姓名：</span>{detailData.userName||''}</div>
                            <div><span>手机号：</span>{detailData.phone||''}</div>
                            <div><span>分组</span>{detailData.notarizationGroup}</div>
                            <div><span>大小：</span>{sizeChange(detailData.notarizationSize)}</div>
                            <div><span>取证时间：</span>{detailData.gmtForensics}</div>
                            <div><span>存证时间：</span>{detailData.gmtDeposit}</div>
                            {/* <div><span>出证时间：</span>{detailData.gmtDeposit}</div> */}
                            <div><span>存证是否实名认证：</span>{detailData.depositIsCert ? '已实名' : '未实名'}</div>
                            <div><span>存证是否支付：</span>{detailData.depositIsPay ? '已支付' : '未支付'}</div>
                            <div><span>出证是否实名认证：</span>{detailData.certificateIsCert ? '已实名' : '未实名'}</div>
                            <div><span>出证是否支付：</span>{detailData.certificateIsPay ? '已支付' : '未支付'}</div>

                            {/* <div><span> 证据期限：</span>{detailData.id}</div> */}
                        </div>
                        <div><span>地址：</span>{detailData.notarizationAddress}</div>
                    </div>
                    <div className={styles.view}>
                        {
                            (() => {
                                switch (type) {
                                    case 'photo':
                                        return <img src={detailData.fileUrl} alt="" />

                                    case 'video':
                                        return <video width="320" height="240" controls ref={videoEl}>
                                        <source src={detailData.fileUrl} type="video/mp4" />
                                      您的浏览器不支持Video标签。
                                      </video>
                                    case 'voice':
                                        return <audio src={detailData.fileUrl} controls="controls">
                                            您的浏览器不支持 audio 标签。
                                        </audio>

                                    default:
                                        return null;
                                }
                            })()
                        }
                    </div>
                    {
                        detailData.notarizationNumber ? <div style={{ marginTop: '10px' }}>
                            <DownloadOutlined style={{ color: '#1890ff', marginRight: '8px' }} /><a onClick={() => downLoad()}>点击下载资料</a>
                        </div> : null
                    }
                </>}


                {/* <h3>修改信息</h3>
               <div>
                   <div>出证金额：</div>
                   <Input value={money} onchange={e=>setMoney(e.targer.value)}></Input>
               </div> */}

            </Card>
        </>
    )
}