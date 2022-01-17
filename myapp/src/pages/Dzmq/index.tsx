// 电子面签
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Tabs } from 'antd';
import { getZjlb, getLx, getZjlx } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { sizeChange } from '@/util/util';
import styles from './index.less';

const { TabPane } = Tabs;
export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState({});
    const [statusList, setStatusList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [baseStatues, setBaseStatues] = useState({});

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
            render: ({ status, id, notarizationWay, notarizationNumber, certificateTotalAmount }) => (
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
        async function getmenu() {
            const [statusData, typeData] = await Promise.all([
                getLx(),
                getZjlx(),
            ])
            setStatusList(changType(statusData))
            setTypeList(changType(typeData))
        }
        getmenu();
    }, []);

    const getList = async (
        pageNum = 1,
        param = {},
        pageSize = 10,
    ) => {
        const params = {
            pageSize: pageNum,
            pageNumber: pageSize,
            ...baseStatues,
            ...param,
        }
        if (!Array.isArray(params.statuses)) {
            params.statuses = [params.statuses]
        }
        const res = await getZjlb(params)
        const { records, total, size } = res as any;
        setTotalSize(total);
        setpageSize(size);
        setTenantList(records);
        setLoading(false);
    };

    function changType(value) {
        if (!Array.isArray(value)) return [];
        const tempData = [];
        value.map(ele => {
            tempData.push({ name: ele, value: ele });
        })
        return tempData;
    };

    const handleSearch = (data: any) => {
        setLoading(true);
        getList(1, data);
        setSearchWord(data)
    };

    const handlePaging = (num: any, size: any) => {
        setLoading(true);
        getList(num, searchWord, size);
    };

    const pagingSizeChange = (size: any, searchWord: any) => {
        setLoading(true);
        setpageSize(size);
        getList(1, searchWord, size);
    };

    function callback(key) {
        console.log(key);
    }

    return (
        <div className={styles.contain}>
            <div className={styles.containHead}>
                <h3>电子面签</h3>
                <div className={styles.add} onClick={() => {
                            window.open(`/dzmq/add`);
                        }} >add</div>
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={`待签署(${totalSize})`} key="1">
                    <BaseTable
                        dataSource={tenantList || []}
                        hideState={true}
                        loading={loading}
                        columns={columns as any}

                        handleSearch={(e: any) => handleSearch(e)}
                        handlePaging={(e: any, v) => handlePaging(e, v)}
                        pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                        totalSize={totalSize}
                    />
                </TabPane>
                <TabPane tab={`已完成(${totalSize})`} key="2">
                    <BaseTable
                        dataSource={tenantList || []}
                        hideState={true}
                        loading={loading}
                        columns={columns as any}

                        handleSearch={(e: any) => handleSearch(e)}
                        handlePaging={(e: any, v) => handlePaging(e, v)}
                        pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                        totalSize={totalSize}
                    />
                </TabPane>
            </Tabs>

        </div>
    )
}
