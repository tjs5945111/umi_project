import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'

import { Card, Form, Input, Button, Radio, DatePicker, message } from 'antd';
import { getDqDeatil } from '@/services/ant-design-pro/api';
import moment from 'moment';
// import FileViewer from 'react-file-viewer';

import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    const detailId = props.location?.query?.id || '';
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        getList(detailId)
    }, [])

    const getList = async (detailId) => {
        const res = await getDqDeatil({ id: detailId })
        console.log(res);
        setDetailData(res.data)
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
                        <p> <span>案件名称：</span>{detailData.name || ''}</p>
                        {/* <p> <span>上传人：</span>{detailData?.contractCaseSignerResponseVOS[0]?.name || ''}</p> */}
                        <p> <span>文书数量：</span>{detailData.docCount || ''}</p>
                        <p> <span>案件状态：</span>{detailData.status || ''}</p>
                        <p> <span>发起方：</span>{detailData.initiator || ''} </p>
                    </div>
                    <h4>签约信息</h4>

                    {
                        detailData?.contractCaseSignerResponseVOS?.map((item,index) => (
                            <div>
                                <h5>合同{index+1}_用户信息</h5>
                                <p> <span>签约方：</span>{item.contractUser?.name || ''}({item.contractUser?.mobile || ''}) </p>
                                <p> <span>身份证：</span>{item.contractUser?.idNumber || ''} </p>
                                <p> <span>签约主体类型：</span>{item.contractUser?.idType || ''} </p>
                                <p> <span>是否需要活体检验：</span>{item.contractUser?.contractUser?.platform ? "需要" : '不需要'} </p>
                                <p> <span>签署状态：</span>{item.contractUser?.contractUser?.status === 'Y' ? '已签署' : '未签署'} </p>
                            </div>
                        ))
                    }
    
                    {/* <h4>业务合同书</h4>
                    <div className={styles.contain} >
                        <FileViewer
                                    fileType='http://example.com/image.png'
                                    filePath='png'
                                    // errorComponent={CustomErrorComponent}
                                    onError={e => console.error(e)} />
                    </div> */}
                </div>

            </Card>
        </>
    )
}