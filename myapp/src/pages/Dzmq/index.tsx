// 电子面签
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Tabs } from 'antd';
import { ztList } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { sizeChange } from '@/util/util';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [tenantListC, setTenantListC] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [totalSizeC, setTotalSizeC] = useState(0);
    const [keys, setKeys] = useState(1);

    const columns = [
        {
            width: 100,
            title: '名称',
            dataIndex: 'fileName',
        },
        {
            title: '证据编号',
            dataIndex: 'notarizationNumber',
        },
        {
            title: '姓名',
            dataIndex: 'userName',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },

        {
            title: '类型',
            dataIndex: 'notarizationWay',
        },
        {
            title: '分组',
            dataIndex: 'notarizationGroup',
        },
        {
            title: '取证地址',
            dataIndex: 'notarizationAddress',
        },
        {
            title: '邮寄地址',
            dataIndex: 'sendaddress',
        },
        {
            title: '大小',
            // dataIndex: 'notarizationSize',
            render: ({ notarizationSize }) => (<>{sizeChange(notarizationSize)}</>)
        },
        {
            title: '取证时间',
            render: ({ gmtCreate }) => (
                <div style={{ maxWidth: 200 }}>
                    {gmtCreate && moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            ),
        },
        {
            title: '状态',
            render: ({ status }) => (
                <div style={{ maxWidth: 200 }}>
                    {status}
                </div>
            ),
        },
        {
            title: '操作',
            key: 'actionList',
            fixed: 'right',
            width: 200,
            render: ({ id }) => (
                <div

                    style={{
                        display: 'flex',
                        // minWidth: '60px',
                        // justifyContent: "space-between",
                        alignItems: 'center',
                        lineHeight: '0px',
                    }}
                >
                    <a
                        style={{ marginRight: 30 }}
                        onClick={() => {
                            window.open(`/dzmq/detail?id=${id}&type=}`);
                        }}
                    >
                        详情
                    </a>

                </div>
            ),
        },
    ];

    useEffect(() => {
        getList();
    }, []);

    const getList = async (
        pageNum = 1,
        param = {},
        pageSize = 10,
        type=[1,2]
    ) => {
        const params = {
            pageSize: pageNum,
            pageNumber: pageSize,
            ...param,
        }
        for (let i of type) {
            let res ={}
            let ress ={}
            if(i === 1){
                params.status='待签署';
                res = await ztList(params)
                const { records, total, size } = res as any;
                setTenantList(records);
                setTotalSize(total);
            }else{
                params.status='已完成';
                ress = await ztList(params)
                const { records, total, size } = ress as any;
                setTenantListC(records);
                setTotalSizeC(total);
            }
          }
        
        // setpageSize(size);
        // setTenantList(records);
        setLoading(false);
    };

    const handlePaging = (num: any, size: any) => {
        setLoading(true);
        if(keys === 1){
            getList(num, {status:'待签署'}, size);
        }else{
            getList(num, {status:'已完成'}, size);
        }
        setLoading(false);
       
    };

    const pagingSizeChange = (size: any, searchWord: any) => {
        // setLoading(true);
        // setpageSize(size);
        // getList(1, searchWord, size);
    };

    function callback(key) {
        setKeys(key)
    }

    return (
        <div className={styles.contain}>
            <div className={styles.containHead}>
                <h3>电子面签</h3>
                <div className={styles.add} onClick={() => {
                    window.open(`/dzmq/add`);
                }} >
                    <img src="" alt="" />
                    <div>
                        <p>自定义合同新建</p>
                        <p style={{ color: '#666' }}>支持pdf、word</p>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={`待签署(${totalSize})`} key="1">
                    <BaseTable
                        dataSource={tenantList || []}
                        hideState={true}
                        loading={loading}
                        columns={columns as any}
                        handlePaging={(e: any, v) => handlePaging(e, v)}
                        pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                        totalSize={totalSize}
                    />
                </TabPane>
                <TabPane tab={`已完成(${totalSizeC})`} key="2">
                    <BaseTable
                        dataSource={tenantListC || []}
                        hideState={true}
                        loading={loading}
                        columns={columns as any}
                        handlePaging={(e: any, v) => handlePaging(e, v)}
                        pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                        totalSize={totalSizeC}
                    />
                </TabPane>
            </Tabs>

        </div>
    )
}
