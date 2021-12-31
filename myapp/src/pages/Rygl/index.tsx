// 人员管理
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio, Button, Popconfirm } from 'antd';
import { getRylb, getJslb, rysc } from '@/services/ant-design-pro/api';
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
            width: 100,
            title: '角色',
            dataIndex: 'role',
        },
        {
            title: '编号',
            dataIndex: 'id',
        },

        {
            title: '账号',
            dataIndex: 'access',
        },
        {
            title: '密码',
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
                            window.open(`./rygl/detail?id=${data.id}&type=VIEW&data=${JSON.stringify(data)}`);
                        }}
                    >
                        编辑
                    </a>
                    {/* <Divider /> */}
                    <a onClick={()=>confirm(data.id)}>删除</a>
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
        async function getmenu() {
            const [statusData] = await Promise.all([
                getJslb(),
            ])
            setTypeList(changType(statusData))
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
        const res = await getRylb(params)
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

    const handlePaging = (data: any, searchWord: any) => {
        setLoading(true);
        getList(data, searchWord, pageSize);
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
            添加人员
        </Button>,
    ];
    const searchArray = [
        { name: '账号', value: 'access' },
        { name: '角色', value: 'role', type: 'select', data: typeList },
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
                tableName="人员管理"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
        </>
    )
}
