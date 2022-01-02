import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'
import { getZjxq,downLoadFun } from '@/services/ant-design-pro/api';
import {
    Player,
    ControlBar,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl, // 前进按钮
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton, // 倍速播放选项
    VolumeMenuButton,
} from 'video-react';
import 'video-react/dist/video-react.css';
import { Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    const detailId = props.location?.query?.id || '';
    const [detailData, setDetailData] = useState({});
    const [money, setMoney] = useState('');
    // const [money, setMoney] = useState(detailData.);
    useEffect(() => {
        console.log(detailId);
      getList(detailId)
    },[])

    const getList =async () => {
        const res =await getZjxq(detailId)
        console.log(res);
        setDetailData(res)
    }

    const urlArray = [
        {
            name: '证据列表',
            url: '/manager/zjlb',
        },
        {
            name: '证据详情',
        }
    ];
    const downLoad=async()=>{
        // const res =downLoadFun('0e718c37-4b56-4f6e-9522-5a41a7e87634')
        const res =downLoadFun(detailData.notarizationNumber)
        console.log(res);
    }

    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>
                <div className={styles.title}>
                    <img src={imgs} alt="" />
                    <p><span>证件编号：</span>{detailData.notarizationNumber}</p>
                </div>
                <div className={styles.con}>
                    <div><span>证据状态：</span>{detailData.status}</div>
                    <div className={styles.textCo}>
                        <div><span>取证类型：</span>{detailData.fileName}</div>
                        <div><span>取证类型：</span>{detailData.notarizationWay}</div>
                        <div><span>分组</span>{detailData.notarizationGroup}</div>
                        <div><span>取证时间：</span>{detailData.id}</div>
                        <div><span>大小：</span>{parseFloat(detailData.notarizationSize).toFixed(2)} kb</div>
                        <div><span>取证时间：</span>{detailData.gmtForensics}</div>
                        <div><span>存证是否实名认证：</span>{detailData.depositIsCert?'已实名':'未实名'}</div>
                        <div><span>存证是否支付：</span>{detailData.depositIsPay?'已支付':'未支付'}</div>
                        <div><span>出证是否实名认证：</span>{detailData.certificateIsCert?'已实名':'未实名'}</div>
                        <div><span>出证是否支付：</span>{detailData.certificateIsPay?'已支付':'未支付'}</div>
                        <div><span>存证时间：</span>{detailData.gmtDeposit}</div>
                        {/* <div><span> 证据期限：</span>{detailData.id}</div> */}
                    </div>
                    <div><span>地址：</span>{detailData.notarizationAddress}</div>
                </div>
                <div className={styles.view}>
                    {
                        (()=>{
                            switch (type) {
                                case 'photo':
                                    return <img src={detailData.fileUrl} alt="" />
                                    
                                case 'video':
                                    return <Player poster={''}>
                                    <source src={detailData.fileUrl} type="video/mp4" />
                                    <ControlBar autoHide={false} disableDefaultControls={false}>
                                        <ReplayControl seconds={10} order={1.1} />
                                        <ForwardControl seconds={30} order={1.2} />
                                        <PlayToggle />
                                        <CurrentTimeDisplay order={4.1} />
                                        <TimeDivider order={4.2} />
                                        <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                                        <VolumeMenuButton />
                                    </ControlBar>
                                </Player> 
                                    
                                case 'voice':
                                    return   <audio src={detailData.fileUrl}controls="controls">
                                   您的浏览器不支持 audio 标签。
                                    </audio>
                            
                                default:
                                    return null;
                            }
                        })()
                    }
                </div>
                {
                    detailData.notarizationNumber? <div style={{marginTop:'10px'}}>
                    <DownloadOutlined style={{color:'#1890ff',marginRight:'8px'}}/><a onClick={()=>downLoad()}>点击下载资料</a>
                    </div>:null
                }
               
               {/* <h3>修改信息</h3>
               <div>
                   <div>出证金额：</div>
                   <Input value={money} onchange={e=>setMoney(e.targer.value)}></Input>
               </div> */}
               
            </Card>
        </>
    )
}