import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Radio, DatePicker, message } from 'antd';
import { getDqDeatil } from '@/services/ant-design-pro/api';
import moment from 'moment';

import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    const detailId = props.location?.query?.id || '';
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        getList(detailId)
    }, [])

    const getList = async (detailId) => {
        const res = await getDqDeatil({id:detailId})
        console.log(res);
        setDetailData(res)
    }

    const urlArray = [
        {
            name: '电子面签列表',
            url: '/dzmq',
        },
        {
            name: '电子面签详情',
        }
    ];


    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>
                <div className={styles.stepfore}>
                    <h4>基本信息</h4>
                    <div>
                        <p> <span>案件名称：</span>这是名词 </p>
                        <p> <span>上传人：</span>张三 </p>
                        <p> <span>文书数量：</span>1 </p>
                    </div>
                    <h4>签约</h4>
                    <div>
                        <p> <span>签约方：张江公证处</span> </p>
                    </div>
                    <h4>业务合同书</h4>
                    <div dangerouslySetInnerHTML={{ __html: 'fileData' }} className={styles.contain} ></div>
                </div>

            </Card>
        </>
    )
}