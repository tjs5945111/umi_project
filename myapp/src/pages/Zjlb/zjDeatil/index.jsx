import React, { useState, useEffect } from 'react';
import BreadcrumbList from '@/components/BreadcrumbList'
import { Card } from 'antd';
import { get } from 'lodash';
import styles from './index.less'

export default (props) => {
    const type = props.location?.query?.type || '';
    useEffect(() => {
        console.log(props);
    })

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
                {type}
            </Card>
        </>
    )
}