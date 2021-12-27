// 证据列表
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio } from 'antd';
import { getZjlb, getLx, getYysx } from '@/services/ant-design-pro/api';
import { request } from 'umi';
import moment from 'moment';
import styles from './index.less';

export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState({});

    const columns = [
        {
            width: 100,
            title: '名称',
            dataIndex: 'fileName',
        },
        {
            title: '编号',
            dataIndex: 'id',
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
            title: '地址',
            dataIndex: 'notarizationAddress',
        },
        {
            title: '大小',
            dataIndex: 'notarizationSize',
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
                            window.open(`./zjlb/detail?id=${id}&type=voice`);
                        }}
                    >
                        详情
                    </a>
                    {/* <Divider /> */}
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
        param = {},
        pageSize = 10,
    ) => {
        // setLoading(true);
        const params = {
            pageSize:pageNum,
            pageNumber: pageSize,
            ...param,
        }
        const res: any = await getZjlb(params)
        const { records, total,size } = res;
        setTotalSize(total);
        setpageSize(size);
        setTenantList(records);
        setLoading(false);
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

    const onChange = (e: any) => {

    };
    const actionList: any = [
        // <Button
        //     type="primary"
        //     onClick={() => {
        //         window.open('./create');
        //     }}
        // >
        //     新建
        // </Button>,
    ];
    const radioList = [
        <Radio.Group onChange={(e) => onChange(e)} defaultValue="all" buttonStyle="solid">
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="cz">存证</Radio.Button>
            <Radio.Button value="chuz">出证</Radio.Button>
        </Radio.Group>,
    ];
    const searchArray = [
        { name: '编号', value: 'id' },
        { name: '证据类型', value: 'notarizationWays', type: 'select', data: [{ name: '图片取证', value: '图片取证' }, { name: '视频取证', value: '视频取证' }, { name: '录音取证', value: '录音取证' }] },
        { name: '状态', value: 'statues', type: 'select', data: [{ name: '出证中', value: '出证中' }, { name: '存证中', value: '存证中' }, { name: '已存证', value: '已存证' }, { name: '出证失败', value: '出证失败' }] },
    ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                actionList={actionList}
                radioList={radioList}
                searchArray={searchArray}
                searchWord={searchWord}
                hideState={true}
                loading={loading}
                columns={columns as any}
                tableName="证据列表"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any,v) => handlePaging(e, v)}
                pagingSizeChange={(e: any,v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
        </>
    )
}
