import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList';
import imgs from '@/image/banner.png'
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
// import 'video-react/dist/video-react.css';
import { Card } from 'antd';
import { get } from 'lodash';
import styles from './index.less'

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
            name: '证据列表',
            url: '/zjlb',
        },
        {
            name: '证据详情',
        }
    ];

    return (
        <>
            <BreadcrumbList urls={urlArray} />
            <Card bordered={false} className={styles.contain}>
                <div className={styles.title}>
                    <img src={imgs} alt="123" />
                    <p><span>证件编号：</span>213112312312</p>
                </div>
                <div className={styles.con}>
                    <div><span>证据状态：</span>已出证</div>
                    <div className={styles.textCo}>
                        <div><span>取证时间：</span>213123123</div>
                        <div><span>大小：</span>1m</div>
                        <div><span>取证时间：</span>213123123</div>
                        <div><span> 证据期限：</span>13123</div>
                    </div>
                    <div><span>备注：</span>13123</div>
                </div>
                <div className={styles.view}>
                    <Carousel dots="false" >
                        <Player poster={''}>
                            <source src={''} type="video/mp4" />
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
                    </Carousel>
                </div>
            </Card>
        </>
    )
}