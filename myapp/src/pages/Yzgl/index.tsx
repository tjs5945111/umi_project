// 印章管理
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio, Button, Popconfirm } from 'antd';
import { yzList, rysc } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState({});
    const [typeList, setTypeList] = useState([]);
    const [baseStatues, setBaseStatues] = useState({});

    const columns = [
        {
            title: '印章名称',
            dataIndex: 'role',
        },
        {
            title: '印章编号',
            dataIndex: 'id',
        },

        {
            title: '公司名称',
            dataIndex: 'access',
        },
        {
            title: '状态',
            dataIndex: 'secret',
        },
        {
            title: '操作',
            key: 'actionList',
            // fixed: 'right',
            // width: 230,
            render: (data) => (
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
                            window.open(`/yzgl/detail?id=${data.id}`);
                        }}
                    >
                        查看详情
                    </a>
                    {/* <Divider /> */}
                    {/* <a onClick={() => confirm(data.id)}>删除</a> */}
                    {/* <Popconfirm
                        title="你确定要删除该人员吗?"
                        onConfirm={confirm}
                        onCancel={e=>cancel(e,id)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm> */}
                </div>
            ),
        },
    ];
    const confirm = async (id) => {
        const res = await rysc(id);
        if (res === 1) {
            getList();
        }
    };
    useEffect(() => {
        getList();
    }, []);

    const getList = async (
        pageNum = 1,
        param = {},
        pageSize = 10,
    ) => {
        const params = {
            pageSize: pageSize,
            pageNumber: pageNum,
            ...baseStatues,
            ...param,
        }
        const res = await yzList(params)
        const { data = [], total, size } = res.data || {} as any;
        setTotalSize(total);
        setpageSize(size);
        setTenantList(data);
        setLoading(false);
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

    const actionList: any = [
        <Button
            type="primary"
            onClick={() => {
                window.open(`./rygl/detail`);
            }}
        >
            添加印章
        </Button>,
    ];
    const searchArray = [
        { name: '印章名称', value: 'access' },
        { name: '公司名称', value: 'role', type: 'select', data: typeList },
        { name: '印章状态', value: 'role', type: 'select', data: typeList },
    ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                actionList={actionList}
                searchArray={searchArray}
                searchWord={searchWord}
                hideState={true}
                loading={loading}
                columns={columns as any}
                tableName="印章管理"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
        </>
    )
}
