// 人员列表
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { Button, Popconfirm, message, Divider } from 'antd';
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
    function confirm(e) {
        console.log(e);
        message.success('Click on Yes');
    }

    function cancel(e) {
        console.log(e);
        message.error('Click on No');
    }
    const columns = [
        {
            width: 100,
            title: '角色',
            dataIndex: 'num',
        },

        {
            title: '账号',
            dataIndex: 'type',
        },
        {
            title: '密码',
            dataIndex: 'phone',
        },
        {
            title: '操作',
            key: 'actionList',
            // fixed: 'right',
            width: 230,
            render: ({ id }) => (
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
                            window.open(`./rygl/detail?id=${id}&type=VIEW`);
                        }}
                    >
                        编辑
                    </a>
                    <Divider />
                    <Popconfirm
                        title="你确定要删除该人员吗?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
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
                window.open('./deatil');
            }}
        >
            添加人员
        </Button>,
    ];
    const radioList = [];
    const searchArray = [
        { name: '账号', value: 'num' },
        { name: '角色', value: 'qzType', type: 'select', data: [{ name: '图片取证', value: 'photo' }, { name: '视频取证', value: 'video' }, { name: '录音取证', value: 'voice' }] },
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
                tableName="人员列表"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any) => handlePaging(e)}
                pagingSizeChange={(e: any) => pagingSizeChange(e)}
                totalSize={totalSize}
            />
        </>
    )
}
