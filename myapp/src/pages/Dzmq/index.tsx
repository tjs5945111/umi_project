// 电子面签
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Tabs } from 'antd';
import { getDqlb,dqDrown } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { sizeChange } from '@/util/util';
import styles from './index.less';

const { TabPane } = Tabs;
const ContractCaseEnum = { INIT: '初始状态', FLOW_CREATED: '流程已创建', SIGNING: '待他人签约', SIGNED: '已签约' }
export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [tenantListC, setTenantListC] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [totalSizeC, setTotalSizeC] = useState(0);
    const [keys, setKeys] = useState(1);

    const columns = [
        {
            title: '案件名称',
            dataIndex: 'name',
        },
        {
            title: '发起方',
            dataIndex: 'initiator',
        },
        {
            title: '发起时间',
            dataIndex: 'gmtCreate',
        },
        {
            title: '文书数量',
            dataIndex: 'docCount',
        },
        {
            title: '合同状态',
            render: ({ status }) => (
                <div style={{ maxWidth: 200 }}>
                    {ContractCaseEnum[status] || status}
                </div>
            ),
        },
        {
            title: '操作',
            key: 'actionList',
            fixed: 'right',
            width: 200,
            render: ({ id,status,flowId }) => (
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
                            window.open(`/dzmq/detail?id=${id}`);
                        }}
                    >
                        查看详情
                    </a>
                    {
                        status ==='SIGNED'? <a
                        style={{ marginRight: 30 }}
                        onClick={async e => {
                            e.defaultPrevented;
                            const res =await dqDrown({flowId})
                            res.data.map(item=>{
                                window.location.assign(item.fileUrl)
                            })
                            // debugger
                        }}
                    >
                        下载
                    </a>:null
                    }
                   

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
        type = [1, 2]
    ) => {
        const params = {
            pageSize: pageSize,
            pageNumber: pageNum,
            ...param,
        }
        for (let i of type) {
            let res = {}
            let ress = {}
            if (i === 1) {
                params.status = ['INIT','FLOW_CREATED','SIGNING'];
                res = await getDqlb(params)
                const { data = {}, total = 0, size } = res as any;
                // const temp = (data.data || []).filter(item => item.status !== 'SIGNED')
                // data.data.filter(item => item.status !== 'SIGNED')
                setTenantList(res.data.data);
                // ress = await getDqlb(res.data)
                setTotalSize(res.data.total);
            } else {
                // params.status = '';
                params.status = ['SIGNED'];
                ress = await getDqlb(params)
                const { data = {}, total, size } = ress as any;
                setTenantListC(data.data);
                setTotalSizeC(data.total);
            }
        }

        // setpageSize(size);
        // setTenantList(records);
        setLoading(false);
    };

    const handlePaging = (num: any, size: any) => {
        setLoading(true);
        if (keys === 1) {
            getList(num, { status: [] }, size, [1]);
        } else {
            getList(num, { status: ['SIGNED'] }, size, [2]);
        }
        setLoading(false);

    };

    const pagingSizeChange = (size: any, searchWord: any) => {
        // setLoading(true);
        // setpageSize(size);
        // getList(1, searchWord, size);
    };

    function callback(key) {
        setKeys(parseInt(key))
    }

    return (
        <div className={styles.contain}>
            <div className={styles.containHead}>
                <h3>电子面签</h3>
                <div className={styles.add} onClick={() => {
                    window.open(`/dzmq/add`);
                }} >
                    <img src="https://gw.alipayobjects.com/mdn/rms_3015bf/afts/img/A*mzI2QZieUyEAAAAAAAAAAAAAARQnAQ" alt="" />
                    <div>
                        <p>自定义合同新建</p>
                        <p style={{ color: '#666' }}>支持pdf、word</p>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={`待签署 (${totalSize || 0})`} key="1">
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
                <TabPane tab={`已完成 (${totalSizeC || 0})`} key="2">
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
