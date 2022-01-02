// 预约列表
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio, Popconfirm } from 'antd';
import { getYylb, getYysx, getLx, yysc } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },

        {
            title: '类型',
            dataIndex: 'matter',
        },
        {
            title: '操作人手机号',
            dataIndex: 'phone',
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
                            window.open(`./yylb/detail?id=${id}&type=VIEW`);
                        }}
                    >
                        详情
                    </a>
                    <a onClick={()=>confirm(id)}>删除</a>
                    {/* <Divider /> */}
                    {/* <Popconfirm
                        title="你确定要删除该人员吗?"
                        onConfirm={confirm}
                        onCancel={async() => cancel(id)}
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
        console.log(id)     
        const res = await yysc(id);
        if (res === 1) {
            message.success('删除成功')
            getList();
        }else{
            message.error('删除失败，请稍后再试')
        }
    };
    useEffect(() => {
        getList();
        async function getmenu() {
            const [statusData, typeData] = await Promise.all([
                getLx(),
                getYysx(),
            ])
            setStatusList(changType(statusData))
            setTypeList(changType(typeData.records))
        }
        getmenu();
    }, []);
    function changType(value) {
        if (!Array.isArray(value)) return [];
        const tempData = [];
        value.map(ele => {
            if (typeof (ele) === 'object') {
                const temp = JSON.parse(ele.configValue).subject
                tempData.push({ name: temp, value: temp });
            } else {
                tempData.push({ name: ele, value: ele });
            }

        })
        return tempData;
    };
    const getList = async (
        pageNum = 1,
        param = {},
        pageSize = 10,
    ) => {
        const params = {
            pageSize: pageNum,
            pageNumber: pageSize,
            ...baseStatues,
            ...param
        }
        if (param.startTime && param.startTime.length) {
            params.startTime = moment(param.startTime[0]._d).format('YYYY-MM-DD hh:mm:ss')
            params.endTime = moment(param.startTime[1]._d).format('YYYY-MM-DD hh:mm:ss')
        }
        const res = await getYylb(params)
        const { records, total, size } = res as any;
        setTotalSize(total);
        setpageSize(size);
        setTenantList(records);
        setLoading(false);
    };


    const handleSearch = (data: any) => {
        console.log('111', data);

        // data.gmtCreate =moment(data.gmtCreate._d).format('YYYY-MM-DD hh:mm:ss')
        setLoading(true);
        getList(1, data);
        // setSearchWord(data)
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
        // <Button
        //     type="primary"
        //     onClick={() => {
        //         window.open('./create');
        //     }}
        // >
        //     新建
        // </Button>,
    ];
    const searchArray = [
        // { name: '姓名', value: 'name' },
        { name: '预约事项', value: 'matter', type: 'select', data: typeList },
        { name: '预约开始时间', value: 'startTime', type: 'date' },
        // { name: '预约结束时间', value: 'endTime', type: 'date'},
        // { name: '状态', value: 'statues', type: 'select', data: statusList },
    ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                actionList={actionList}
                // radioList={radioList}
                searchArray={searchArray}
                searchWord={searchWord}
                hideState={true}
                loading={loading}
                columns={columns as any}
                tableName="预约列表"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
        </>
    )
}
