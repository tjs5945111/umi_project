import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { Card,message, Divider } from 'antd';
import moment from 'moment';
import styles from './index.less'

export default ()=>{
    const [tenantList, setTenantList] = useState([]);
    useEffect(()=>{

    },[]);


    return(
        <>
        <Card bordered={false}>
        <h3>电子面签</h3>
        </Card>
        </>
    )
}