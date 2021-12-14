// 证据列表
import React, { useState, useEffect } from 'react';
import BaseTable from '@/components/BaseTable'
import{Button} from 'antd'

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
            title: '租户Id',
            dataIndex: 'tenantId',
        },

        {
            title: '租户code',
            dataIndex: 'tenantCode',
        },
        {
            title: '租户名称',
            dataIndex: 'tenantName',
        },
        {
            title: '管理员',

            key: 'owner',
            dataIndex: 'owner',
            render: owner => (
                <div style={{ maxWidth: 200 }}>
                    123
                </div>
            ),
        },
        {
            title: '修改信息',

            render: ({ gmtModified, modifier }) => (
                <div style={{ maxWidth: 200 }}>
                    123
                </div>
            ),
        },
        {
            title: '创建信息',

            render: ({ gmtCreate, creator }) => (
                <div style={{ maxWidth: 200 }}>
                    <div style={{ marginBottom: '10px' }}>{formatUserInfo(creator)}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                        {gmtCreate && moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                </div>
            ),
        },
        {
            title: '操作',
            key: 'actionList',
            // fixed: 'right',
            width: 230,
            render: (data: any, { primaryId }) => (
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
                            window.open(`./create?primaryId=${primaryId}&action=VIEW`);
                        }}
                    >
                        查看
                    </a>
                    <a
                        style={{ marginRight: 30 }}
                        onClick={() => {
                            window.open(`./create?primaryId=${primaryId}&action=UPDATED`);
                        }}
                    >
                        编辑
                    </a>

                    {/* <a
              style={{ marginRight: 30 }}
              onClick={() => {
                confirm({
                  title: '你确定要删除该租户吗?',
                  cancelText: '取消',
                  okText: '确定',
                  onOk: async () => {
                    const res = await fetch({
                      url: '/api/sophon/tenantDelete',
                      param: {
                        primaryId,
                      },
                    });
                    if (res.success) {
                      message.success('删除成功');
                      getList(1, searchWord, pageSize);
                    }
                  },
                });
              }}
            >
              删除
            </a> */}
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
                radioList={actionList}
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
