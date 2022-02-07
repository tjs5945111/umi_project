// 印章管理
import React, { useState, useEffect, useRef } from 'react';
import BaseTable from '@/components/BaseTable';
import { message, Divider, Radio, Button, Table, Drawer, Space, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { yzList, rysc, yzAdd } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select;

export default () => {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    const [searchWord, setSearchWord] = useState({});
    const [typeList, setTypeList] = useState([]);
    const [baseStatues, setBaseStatues] = useState({});
    const [visible, setVisible] = useState(false);
    const [yzid, setYzid] = useState('');
    const [ids, setIds] = useState('');
    const [imgData, setImgData] = useState('');
    const qyEl = useRef(null);

    const columns = [
        {
            title: '用户名称',
            dataIndex: 'name',
        },
        {
            title: '用户电话',
            dataIndex: 'mobile',
        },

        {
            title: '用户身份证号',
            dataIndex: 'idNumber',
        },
        {
            title: '创建时间',
            dataIndex: 'gmtCreate',
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
                    {/* <a
                        style={{ marginRight: 30 }}
                        onClick={() => {
                            window.open(`/yzgl/detail?id=${data.id}`);
                        }}
                    >
                        查看详情
                    </a> */}
                    <a
                        style={{ marginRight: 30 }}
                        onClick={() => { setVisible(true); setYzid(data.userAcc);setIds(data.id) }}
                    >
                        添加印章
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

    const ztSubmit = async () => {
        // 添加印章
        if (!qyEl || !qyEl?.current) return;
        qyEl.current.validateFields().then(async (values) => {
            values.userAcc = yzid;
            values.sealData = imgData;
            values.accountId = ids;
            console.log(values);

            const res = await yzAdd(values);
            console.log('res', res);
            if (res.code === 'ok') {
                setVisible(false);
                message.success('添加成功')
            } else {
                message.error(res.msg || '添加失败')
            }
        })
    }

    // const actionList: any = [
    //     <Button
    //         type="primary"
    //         onClick={() => {
    //             window.open(`./rygl/detail`);
    //         }}
    //     >
    //         添加印章
    //     </Button>,
    // ];
    const propsU = {
        name: 'file',
        action: '',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: async (info) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                var reader = new FileReader();
                reader.onloadend = function (event) {
                    setImgData((reader.result||'').split(',')[1] || '')
                };
                reader.readAsDataURL(info.file?.originFileObj);
                // message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败.`);
            }
        },
        onRemove(data) {
            setImgData('')
        }
    };

    const expandedRowRender = (e) => {
        // debugger
        const columns = [
            { title: '印章名称', dataIndex: 'alias', key: 'date' },
            { title: '印章高度', dataIndex: 'height', key: 'namde' },
            { title: '印章宽度', dataIndex: 'height', key: 'name' },
            { title: '印章id', dataIndex: 'fileKey', key: 'name' },
        ];

        return <Table columns={columns} dataSource={e.contractSealVO || []} pagination={false} />;
    };
    // const searchArray = [
    //     { name: '印章名称', value: 'access' },
    //     { name: '公司名称', value: 'role', type: 'select', data: typeList },
    //     { name: '印章状态', value: 'role', type: 'select', data: typeList },
    // ];
    return (
        <>
            <BaseTable
                dataSource={tenantList || []}
                // actionList={actionList}
                // searchArray={searchArray}
                searchWord={searchWord}
                hideState={true}
                loading={loading}
                columns={columns as any}
                expandable={{ expandedRowRender }}
                tableName="用户_印章管理"
                handleSearch={(e: any) => handleSearch(e)}
                handlePaging={(e: any, v) => handlePaging(e, v)}
                pagingSizeChange={(e: any, v) => pagingSizeChange(e, v)}
                totalSize={totalSize}
            />
            <Drawer title="签约主体" placement="right" onClose={() => setVisible(false)} visible={visible} footer={true} width={500} footer={
                <Space>

                    <Button onClick={() => setVisible(false)}>取消</Button>
                    <Button type="primary" onClick={ztSubmit}>
                        提交
                    </Button>
                    {/* </div> */}

                </Space>
            }>
                <Form
                    name="basic"
                    ref={qyEl}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ width: 100, height: 100 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="印章名称"
                        name="alias"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="印章宽度"
                        name="width"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="印章高度"
                        name="height"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="印章图片"
                        name="sealData"
                        rules={[{ required: false, message: '请输入' }]}
                    >
                        <Upload {...propsU}>
                            <Button icon={<UploadOutlined />} disabled={!!imgData}>上传文件</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}
