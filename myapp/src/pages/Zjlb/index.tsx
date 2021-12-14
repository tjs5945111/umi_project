// 证据列表
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { Button, Radio } from 'antd';
import moment from 'moment';


import styles from './index.less';

export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState<any>({
        tenantId: '',
        tenantCode: '',
        tenantName: '',
    });
    const columns = [
        {
            width: 100,
            title: '编号',
            dataIndex: 'num',
        },

        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '操作人手机号',
            dataIndex: 'phone',
        },
        {
            title: '大小',
            dataIndex: 'szie',
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
            render: ({ statue }) => (
                <div style={{ maxWidth: 200 }}>
                    123
                </div>
            ),
        },
        {
            title: '操作',
            key: 'actionList',
            // fixed: 'right',
            width: 230,
            render: (data: any) => (
                <div
                    style={{
                        display: 'flex',
                        minWidth: '150px',
                        // justifyContent: "space-between",
                        alignItems: 'center',
                        lineHeight: '0px',
                    }}
                >
                    <a
                        style={{ marginRight: 30 }}
                        onClick={() => {
                            // window.open(`./create?primaryId=${primaryId}&action=VIEW`);
                        }}
                    >
                        详情
                    </a>
                    <a
                        style={{ marginRight: 30 }}
                    >
                        下载
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
        param = { tenantId: '', tenantCode: '', tenantName: '' },
        pageSize = 10,
    ) => {
        setLoading(true);
        //   const res = await fetch({
        //     url: '/api/sophon/tenantList',
        //     param: { pageNum, pageSize, param },
        //   });
        //   if (res.success) {
        //     setTenantList(res?.data?.tenantDTOS || []);
        //     setTotalSize(res?.data?.count || 0);
        //   } else {
        //     message.error(`${res?.data}`);
        //   }
        setTenantList([{ num: '2334234' }]);
        setLoading(false);
    };

    const handleSearch = (data: any) => {
        setLoading(true);
        getList(1, data);
    };

    const handlePaging = (data: any) => {
        setLoading(true);
        getList(data, searchWord, pageSize);
    };

    const pagingSizeChange = (size: any) => {
        setLoading(true);
        setpageSize(size);
        getList(1, searchWord, size);
    };

    const onChange = (e: any) => {

    };
    const actionList = [
        <Button
            type="primary"
            onClick={() => {
                window.open('./create');
            }}
        >
            新建
        </Button>,
    ];
    const radioList = [
        <Radio.Group onChange={(e) => onChange(e)} defaultValue="all" buttonStyle="solid">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="cz">存证</Radio.Button>
            <Radio.Button value="chuz">出证</Radio.Button>
        </Radio.Group>,
    ];
    const searchArray = [
        { name: '租户id', value: 'tenantId' },
        { name: '租户code', value: 'tenantCode' },
        { name: '租户name', value: 'tenantName' },
    ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                actionList={actionList}
                radioList={radioList}
                searchArray={searchArray}
                hideState={true}
                loading={loading}
                columns={columns as any}
                tableName="租户列表"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any) => handlePaging(e)}
                pagingSizeChange={(e: any) => pagingSizeChange(e)}
                totalSize={totalSize}
            />
        </>
    )
}
