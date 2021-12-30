// 证据列表
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio } from 'antd';
import { getZjlb, getLx, getZjlx, downLoadFun } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

const eum = {
    照片取证: 'photo',
    录音取证: 'voice',
    视频取证: 'video',
}
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
            render: ({ notarizationSize }) => (<>{parseFloat(notarizationSize).toFixed(2)} kb</>)
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
            // width: 230,
            render: ({ status, id, notarizationWay }) => (
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
                            window.open(`/zjlb/detail?id=${id}&type=${eum[notarizationWay]}`);
                        }}
                    >
                        详情
                    </a>
                    {/* <Divider /> */}
                    {
                        status === '出证中' ? <a
                            onClick={() => downLoad()}
                            style={{ marginRight: 30 }}
                        >
                            下载
                        </a> : null
                    }

                </div>
            ),
        },
    ];
    const downLoad = async () => {
        const res = downLoadFun('0e718c37-4b56-4f6e-9522-5a41a7e87634')
        // const res =downLoadFun(detailData.notarizationNumber)
        console.log(res);
    }

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
        console.log(e);
        setBaseStatues({ statuses: [e.target.value] })
        getList(1, { statuses: [e.target.value] });
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
        <Radio.Group onChange={(e) => onChange(e)} defaultValue="" buttonStyle="solid">
            <Radio.Button value="">全部</Radio.Button>
            <Radio.Button value="存证">存证</Radio.Button>
            <Radio.Button value="出证">出证</Radio.Button>
        </Radio.Group>,
    ];
    const searchArray = [
        { name: '编号', value: 'id' },
        { name: '证据类型', value: 'notarizationWays', type: 'select', data: typeList },
        { name: '状态', value: 'statuses', type: 'select', data: statusList },
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
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
        </>
    )
}
